import csv
import json
import re
from pyproj import Transformer

transformer = Transformer.from_crs("EPSG:5174", "EPSG:4326", always_xy=True)

def parse_brand(name):
    if name is None: return "기타"
    if "CGV" in name: return "CGV"
    if "롯데시네마" in name or "롯데" in name: return "롯데시네마"
    if "메가박스" in name: return "메가박스"
    if "씨네큐" in name: return "씨네큐"
    if "작은영화관" in name: return "작은영화관"
    return "기타"
def normalize_address(address):
    if not address:
        return ""
    # ", 2층", ", 3층", "지하1층", "1층", "B1층" 등 제거
    normalized = re.sub(r",?\s*(지하?\d*층|\d+층|[0-9\-]+호)$", "", address.strip())
    return normalized

def extract_cinema_name(name):
    # 층, 관 숫자 등 빼고 순수 극장명만 추출 (예: '메가박스중앙 1관' -> '메가박스중앙')
    if not name:
        return ""
    # 숫자+관, 층 표현 제거, 예: '메가박스중앙 1관', '롯데시네마 3층' 등
    cleaned = re.sub(r'\s*(\d+관|\d+층|지하\d*층)$', '', name.strip())
    return cleaned

cinema_dict = {}

with open('fulldata_03_13_02_P_영화상영관.csv', encoding='cp949') as f:
    reader = csv.DictReader(f)
    for row in reader:
        full_name = row.get('시설명') or ""
        cinema_name = extract_cinema_name(full_name)
        if not cinema_name:
            # 극장명이 없으면 사업장명으로 대체
            cinema_name = extract_cinema_name(row.get('사업장명') or "")
        if not cinema_name:
            continue  # 이름없으면 무시

        address = row.get('도로명전체주소') or row.get('소재지전체주소') or ""
        if not address:
            continue  # 주소 없으면 무시

        status_detail = row.get('상세영업상태명', '').strip()
        if status_detail not in ['영업/정상', '영업중', '정상']:
            continue  # 영업 중인 곳만

        brand = parse_brand(cinema_name)
        city = address.split()[0] if address else ""
        district = address.split()[1] if address and len(address.split()) > 1 else ""
        phone = row.get('전화번호', '')

        # TM 좌표 추출 (컬럼명에 맞게 수정)
        x_str = row.get('좌표정보x(epsg5174)', '').strip()
        y_str = row.get('좌표정보y(epsg5174)', '').strip()

        if not x_str or not y_str:
            continue  # 좌표 없으면 해당 행 무시
        
        x = float(row.get('좌표정보x(epsg5174)', '').strip() or 0)
        y = float(row.get('좌표정보y(epsg5174)', '').strip() or 0)
        # 좌표 변환
        lon, lat = transformer.transform(x, y)

        # id는 주소 기준으로 통일
        key = normalize_address(address)

        if key not in cinema_dict:
            cinema_dict[key] = {
                "id": key,
                "brand": brand,
                "name": cinema_name,
                "address": address,
                "city": city,
                "district": district,
                "phone": phone,
                "status": row.get('영업상태명', ''),
                "latitude": lat,
                "longitude": lon,
                "screens": []
            }

        # 각 층/관을 screens에 추가
        room = full_name  # 관명 또는 층명 등 원본 그대로
        note = row.get('비고', '')
        features = []  # 필요시 특성 추가

        cinema_dict[key]["screens"].append({
            "room": room,
            "features": features,
            "note": note
        })

cinema_list = list(cinema_dict.values())

with open('cinema_grouped.json', 'w', encoding='utf-8') as jf:
    json.dump(cinema_list, jf, ensure_ascii=False, indent=2)

print(f"변환 완료! 총 {len(cinema_list)}개 극장")

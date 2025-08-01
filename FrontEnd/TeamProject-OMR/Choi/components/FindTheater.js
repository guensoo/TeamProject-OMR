import { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import cinemaData from "../../Parse/cinema_grouped.json";
import { SafeAreaView } from "react-native-safe-area-context";

const BRANDS = ["전체", "CGV", "메가박스", "롯데시네마", "씨네큐", "작은영화관", "기타"];
const REGIONS = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

// ✅ 지역명 변환 (경북 → 경상북도 등)
const cityMap = {
    서울: "서울특별시",
    경기: "경기도",
    인천: "인천광역시",
    부산: "부산광역시",
    대구: "대구광역시",
    광주: "광주광역시",
    대전: "대전광역시",
    울산: "울산광역시",
    강원: "강원특별자치도",
    충북: "충청북도",
    충남: "충청남도",
    전북: "전북특별자치도",
    전남: "전라남도",
    경북: "경상북도",
    경남: "경상남도",
    제주: "제주특별자치도"
};

export default function FindTheater({ navigation }) {
    const [cinemas, setCinemas] = useState([]);
    const [brand, setBrand] = useState("전체");
    const [region, setRegion] = useState("서울");

    const districtData = useMemo(() => {
        if (!cinemas.length) return [];

        const convertedCity = cityMap[region] || region;

        // 1. 지역 기준 필터
        let filtered = cinemas.filter(c => c.city && c.city === convertedCity);

        // 2. 브랜드 필터 (전체 제외)
        if (brand !== "전체") {
            filtered = filtered.filter(c => c.brand === brand);
        }

        // 3. 시군구별 대표 극장 1개만 선택 (좌표가 있는 것 중)
        const map = new Map();
        filtered.forEach(c => {
            const key = `${c.city}-${c.district}`;
            if (!map.has(key) && c.latitude && c.longitude) {
                map.set(key, {
                    district: c.district,
                    city: c.city,
                    brand: c.brand,
                    latitude: c.latitude,
                    longitude: c.longitude
                });
            }
        });

        return Array.from(map.values());
    }, [brand, region, cinemas]);

    useEffect(() => {
        setCinemas(cinemaData);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#181825' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                {/* 브랜드 선택 */}
                <ScrollView horizontal style={styles.brandRow}>
                    {BRANDS.map(b => (
                        <TouchableOpacity
                            key={b}
                            style={[styles.brandBtn, brand === b && styles.brandActive]}
                            onPress={() => setBrand(b)}
                        >
                            <Text style={brand === b ? styles.brandActiveText : styles.brandText}>{b}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
                    {/* 지역(시도) 리스트 */}
                    <ScrollView style={{ width: 0, backgroundColor: "#1a1a2e" }}>
                        {REGIONS.map(r => (
                            <TouchableOpacity
                                key={r}
                                style={[styles.regionBtn, region === r && styles.regionActive]}
                                onPress={() => setRegion(r)}
                            >
                                <Text style={region === r ? styles.regionActiveText : styles.regionText}>{r}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* 시군구 리스트 */}
                    <ScrollView style={{ flex: 1, padding: 12, backgroundColor: "#232346" }}>
                        {districtData.length === 0 ? (
                            <Text style={{ color: "#bbb", marginTop: 24 }}>영화관 없음</Text>
                        ) : (
                            districtData.map(({ city, district, brand }) => (
                                <TouchableOpacity
                                    key={`${city}-${district}`}
                                    style={styles.districtBtn}
                                    onPress={() => {
                                        navigation.navigate('MapScreen', {
                                            region: city,
                                            district: district,
                                            brand: brand
                                        });
                                    }}
                                >
                                    <Text style={styles.districtText}>{district}</Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#181825", paddingTop: 32 },
    brandRow: { paddingHorizontal: 8, maxHeight: 30, textAlign: 'center' },
    brandBtn: { paddingHorizontal: 15, paddingVertical: 7, marginHorizontal: 3, borderRadius: 16, backgroundColor: "#232346" },
    brandActive: { backgroundColor: "#ffd700" },
    brandText: { color: "#fff", fontSize: 14 },
    brandActiveText: { color: "#181825", fontWeight: "bold" },
    regionBtn: { padding: 13, borderBottomWidth: 1, borderColor: "#222" },
    regionActive: { backgroundColor: "#ffd700" },
    regionText: { color: "#eee" },
    regionActiveText: { color: "#232346", fontWeight: "bold" },
    districtBtn: { paddingVertical: 10, borderBottomWidth: 1, borderColor: "#353557" },
    districtText: { color: "#fff", fontSize: 15 }
});

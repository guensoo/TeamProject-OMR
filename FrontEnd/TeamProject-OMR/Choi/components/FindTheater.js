import { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import cinemaData from "../../Parse/cinema_grouped.json";

const BRANDS = ["전체", "CGV", "메가박스", "롯데시네마", "씨네큐", "작은영화관", "기타"];
const REGIONS = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

export default function FindTheater({ navigation }) {
    const [cinemas, setCinemas] = useState([]);
    const [brand, setBrand] = useState("전체");
    const [region, setRegion] = useState("서울");

    // ------------------------------------
    // 수정: districts 대신 districtData (대표 좌표 포함)
    const districtData = useMemo(() => {
        if (!cinemas.length) return [];

        // 1. 지역 기준 필터
        let filtered = cinemas.filter(c => c.city && c.city.includes(region));
        // 2. 브랜드 필터 (전체 제외)
        if (brand !== "전체") {
            filtered = filtered.filter(c => c.brand === brand);
        }

        // 3. 시군구별 대표 극장 1개만 선택 (좌표가 있는 것 중)
        const map = new Map();
        filtered.forEach(c => {
            if (!map.has(c.district) && c.latitude && c.longitude) {
                map.set(c.district, c);
            }
        });

        return Array.from(map.values());
    }, [brand, region, cinemas]);
    // ------------------------------------

    useEffect(() => {
        setCinemas(cinemaData);
    }, []);

    return (
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
                <ScrollView style={{ width: 10, backgroundColor: "#1a1a2e" }}>
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

                {/* 시군구 리스트 (대표 좌표 포함) */}
                <ScrollView style={{ flex: 1, padding: 12, backgroundColor: "#232346" }}>
                    {districtData.length === 0 ? (
                        <Text style={{ color: "#bbb", marginTop: 24 }}>영화관 없음</Text>
                    ) : (
                        districtData.map(({ district, latitude, longitude }) => (
                            <TouchableOpacity
                                key={district}
                                style={styles.districtBtn}
                                onPress={() => {
                                    navigation.navigate('MapScreen', { region, district });
                                }}
                            >
                                <Text style={styles.districtText}>{district}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#181825", paddingTop: 32 },
    brandRow: { paddingHorizontal: 8, maxHeight: 50 },
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

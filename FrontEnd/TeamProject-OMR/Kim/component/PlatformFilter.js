import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from './ReviewListStyle';

const PLATFORMS = ['Netflix', 'Disney+', '웨이브', '왓챠', 'PrimeVideo'];

export const PlatformFilter = ({ selectedPlatforms, onToggle }) => (
    <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>플랫폼</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
        >
            {PLATFORMS.map((platform) => (
                <TouchableOpacity
                    key={platform}
                    style={[
                        styles.filterButton,
                        selectedPlatforms.has(platform) && styles.filterButtonActive
                    ]}
                    onPress={() => onToggle(platform)}
                >
                    <Text style={[
                        styles.filterButtonText,
                        selectedPlatforms.has(platform) && styles.filterButtonTextActive
                    ]}>
                        {platform}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);

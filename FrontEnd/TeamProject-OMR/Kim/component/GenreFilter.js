import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from './ReviewListStyle';

const GENRES = ['액션', '멜로', '공포', '코미디', 'SF', '스릴러'];

export const GenreFilter = ({ selectedGenres, onToggle }) => (
    <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>장르</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
        >
            {GENRES.map((genre) => (
                <TouchableOpacity
                    key={genre}
                    style={[
                        styles.filterButton,
                        selectedGenres.has(genre) && styles.filterButtonActive
                    ]}
                    onPress={() => onToggle(genre)}
                >
                    <Text style={[
                        styles.filterButtonText,
                        selectedGenres.has(genre) && styles.filterButtonTextActive
                    ]}>
                        {genre}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);

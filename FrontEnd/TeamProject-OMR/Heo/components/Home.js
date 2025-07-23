import { View, Text, StyleSheet, ScrollView, StatusBar, FlatList } from "react-native"
import Header from "./Header"
import Footer from "./Footer"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { getMoviePopularWithTrailer } from "../../공통/api/tmdb"
import YoutubePlayer from "react-native-youtube-iframe"

const Home = () => {
    const [trailers, setTrailers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMoviePopularWithTrailer(8);
            setTrailers(data);
        }
        fetchData();
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="transparent" 
                translucent 
                barStyle="dark-content" 
            />
            <Header />

            <FlatList
                data={trailers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <YoutubePlayer
                            height={200}
                            play={false}
                            videoId={item.trailerKey}
                        />
                    </View>
                )}
                ListFooterComponent={<Footer />}
            />     
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default Home;
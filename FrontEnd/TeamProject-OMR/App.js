import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './공통/Header/Header';
import Footer from './공통/Footer/Footer';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
            <Text>메인바디</Text>
        </View>
        <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

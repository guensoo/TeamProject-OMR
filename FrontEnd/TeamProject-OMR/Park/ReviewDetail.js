import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native";

const ReviewDetail = ({ route, navigation }) => {
	const { reviewId } = route.params;
	const [review, setReview] = useState(null);
	const [loading, setLoading] = useState(true);

	const sample = {
		id: reviewId,
		title: "맛있고 분위기 좋은 곳!",
		author: "세현",
		date: "2025-07-24",
		rating: 4.5,
		content: "직원도 친절하고 음식도 맛있었어요. 다음에 또 방문할 의향 있습니다.",
		imageUrl: "https://placehold.co/400x200",
	};

	useEffect(() => {
		setTimeout(() => {
			setReview(sample);
			setLoading(false);
		}, 500);
	}, [reviewId]);

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color="#555" />
			</View>
		);
	}

	if (!review) {
		return (
			<View style={styles.center}>
				<Text>리뷰를 찾을 수 없습니다.</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image source={{ uri: review.imageUrl }} style={styles.image} />
			<Text style={styles.title}>{review.title}</Text>
			<View style={styles.infoRow}>
				<Text style={styles.author}>{review.author}</Text>
				<Text style={styles.date}>{review.date}</Text>
				<Text style={styles.rating}>⭐ {review.rating}</Text>
			</View>
			<Text style={styles.content}>{review.content}</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 24,
		backgroundColor: "#fff",
	},
	image: {
		width: "100%",
		height: 180,
		borderRadius: 16,
		marginBottom: 18,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 6,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	author: {
		fontSize: 15,
		color: "#222",
	},
	date: {
		fontSize: 13,
		color: "#aaa",
	},
	rating: {
		fontSize: 15,
		color: "#FFD700",
		fontWeight: "bold",
	},
	content: {
		fontSize: 17,
		lineHeight: 24,
		marginTop: 10,
		marginBottom: 24,
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ReviewDetail;

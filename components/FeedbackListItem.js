import React from "react";
import { Rating } from "react-native-ratings";
import { View, Text, StyleSheet } from "react-native";

const FeedbackListItem = ({ feedbacks }) => {
  return (
    <View>
      {feedbacks.map((feedback) => (
        <View key={feedback.comment} style={styles.container}>
          <Rating
            imageSize={20}
            readonly
            startingValue={feedback.rating}
            style={styles.rating}
          />
          <Text style={styles.comment}>{feedback.comment}</Text>
          <Text style={styles.authorDate}>
            {feedback.author}, {new Date(feedback.date).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  comment: {
    marginBottom: 10,
    fontSize: 16,
  },
  authorDate: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#888",
  },
});

export default FeedbackListItem;

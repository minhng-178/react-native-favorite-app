import React from "react";
import { Rating } from "react-native-ratings";

import { View, Text, StyleSheet } from "react-native";

import FeedbackListItem from "./FeedbackListItem";

const FeedbacksSection = ({ product }) => {
  const feedbacks = product.feedbacks;

  const totalFeedbacks = feedbacks ? feedbacks.length : 0;

  let averageRating = 0;
  if (totalFeedbacks > 0) {
    averageRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      totalFeedbacks;
  }

  return (
    <View>
      <Text style={styles.feedbacks}>Feedbacks</Text>

      <Text style={styles.totalFeedbacks}>
        Total Feedbacks: {totalFeedbacks}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.averageRating}>Average Rating:</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={averageRating}
          style={styles.rating}
        />
      </View>
      <View style={styles.feedbacksContainer}>
        {totalFeedbacks > 0 ? (
          <FeedbackListItem feedbacks={feedbacks} />
        ) : (
          <Text style={styles.noFeedbacks}>
            No feedbacks yet. Please leave one!
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbacks: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalFeedbacks: {
    fontSize: 16,
  },
  averageRating: {
    fontSize: 16,
  },
  rating: {
    marginLeft: 5,
  },
  feedbacksContainer: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  noFeedbacks: {
    fontSize: 16,
    color: "#888",
  },
});

export default FeedbacksSection;

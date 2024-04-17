import { useState } from "react";
import { Rating } from "react-native-ratings";
import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";

import FeedbackListItem from "./FeedbackListItem";

const FeedbacksSection = ({ product }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const feedbacks = product && product.feedbacks ? product.feedbacks : [];

  const totalFeedbacks = feedbacks.length;

  let averageRating = 0;
  if (totalFeedbacks > 0) {
    averageRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      totalFeedbacks;
  }

  const filteredFeedbacks = feedbacks.filter(
    (feedback) => selectedStars === 0 || feedback.rating === selectedStars
  );

  const countFeedbacksPerStar = (feedbacks) => {
    let starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    feedbacks.forEach((feedback) => {
      starCounts[feedback.rating]++;
    });

    return starCounts;
  };

  const starCounts = countFeedbacksPerStar(feedbacks);

  return (
    <View>
      <Text style={styles.feedbacks}>Feedbacks</Text>

      <Text style={styles.totalFeedbacks}>
        Total Feedbacks: {totalFeedbacks}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.averageRating}>
          Average Rating: ({averageRating.toFixed(2)})
        </Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={averageRating}
          style={styles.rating}
        />
      </View>

      <Text style={styles.averageRating}>Filter by Star Ratings:</Text>
      <Picker
        selectedValue={selectedStars}
        onValueChange={(itemValue, itemIndex) => setSelectedStars(itemValue)}
      >
        <Picker.Item label='See all' value={0} />
        <Picker.Item label={`1 Star (${starCounts[1]})`} value={1} />
        <Picker.Item label={`2 Stars (${starCounts[2]})`} value={2} />
        <Picker.Item label={`3 Stars (${starCounts[3]})`} value={3} />
        <Picker.Item label={`4 Stars (${starCounts[4]})`} value={4} />
        <Picker.Item label={`5 Stars (${starCounts[5]})`} value={5} />
      </Picker>

      <View style={styles.feedbacksContainer}>
        {totalFeedbacks > 0 ? (
          <FeedbackListItem feedbacks={filteredFeedbacks} />
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FeedbacksSection;

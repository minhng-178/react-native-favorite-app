import { useRef, useState } from "react";
import { Rating } from "react-native-ratings";
import RBSheet from "react-native-raw-bottom-sheet";

import { View, Text, StyleSheet, Button } from "react-native";

import FeedbackListItem from "./FeedbackListItem";

const FeedbacksSection = ({ product }) => {
  const feedbacks = product.feedbacks;

  const refRBSheet = useRef();

  const [selectedStars, setSelectedStars] = useState(0);

  const totalFeedbacks = feedbacks ? feedbacks.length : 0;

  let averageRating = 0;
  if (totalFeedbacks > 0) {
    averageRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      totalFeedbacks;
  }

  const filteredFeedbacks = feedbacks.filter(
    (feedback) => selectedStars === 0 || feedback.rating === selectedStars
  );

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

      <View style={{ flex: 1 }}>
        <Button
          title='OPEN BOTTOM SHEET'
          onPress={() => refRBSheet.current.open()}
        />
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
          customModalProps={{
            animationType: "slide",
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >
          <View>
            <Text>Hi</Text>
          </View>
        </RBSheet>
      </View>

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

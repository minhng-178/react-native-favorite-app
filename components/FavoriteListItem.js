import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";

import Colors from "../constants/Colors";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const FavoriteListItem = ({ product }) => {
  const { likedProducts, setLikedProducts } = useContext(LikedProductsContext);
  const toast = useToast();

  const handleUnlikeProduct = async () => {
    const productId = product.id.toString();

    try {
      const newLikedProducts = likedProducts.filter((id) => id !== productId);
      setLikedProducts(newLikedProducts);
      await AsyncStorage.setItem("SE162107", JSON.stringify(newLikedProducts));
      toast.show("Unliked!", {
        type: "success",
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Pressable style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
            {product.watchName}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Ionicons
          name='heart'
          size={24}
          color='red'
          onPress={handleUnlikeProduct}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: Colors.light.defaultColor,
  },
});

export default FavoriteListItem;

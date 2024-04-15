import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import Colors from "../constants/Colors";
import { defaultImage } from "../constants/Image";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const ProductListItem = ({ product, navigation, isLike }) => {
  const toast = useToast();
  const isFocused = useIsFocused();

  const { addProductToLikes, removeProductFromLikes } =
    useContext(LikedProductsContext);

  const handleNavigationDetail = () => {
    navigation.navigate("Detail", { product: product });
  };

  const handleLikeProduct = async () => {
    const productId = product.id.toString();

    try {
      if (isLike) {
        await removeProductFromLikes(productId);
      } else {
        await addProductToLikes(productId);
      }
      toast.show(isLike ? "Unliked!" : "Liked!", {
        type: "success",
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLikeProduct}>
        <View style={styles.icon}>
          {isLike && isFocused ? (
            <Ionicons name='heart-sharp' size={24} color='red' />
          ) : (
            <Ionicons name='heart-outline' size={24} color='red' />
          )}
        </View>
      </TouchableOpacity>

      <Pressable onPress={handleNavigationDetail}>
        <Image
          source={{ uri: product.image || defaultImage }}
          style={styles.image}
          resizeMode='contain'
        />

        <Text style={styles.title}>{product.watchName}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    borderRadius: 20,
    maxWidth: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.defaultColor,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  icon: {
    alignItems: "flex-end",
  },
});

export default ProductListItem;

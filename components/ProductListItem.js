import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";

import Colors from "../constants/Colors";
import { defaultImage } from "../constants/Image";

const ProductListItem = ({ product, navigation }) => {
  const isLike = false;
  const toast = useToast();

  const handleNavigationDetail = () => {
    navigation.navigate("Detail", { product: product });
  };

  const handleLikeProduct = () => {
    toast.show("Like!", {
      duration: 2000,
      type: "success",
      placement: "top",
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLikeProduct}>
        <View style={styles.icon}>
          {isLike ? (
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

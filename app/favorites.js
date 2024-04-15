import Checkbox from "expo-checkbox";
import { useContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";
import data from "../assets/data/db.json";
import FavoriteListItem from "../components/FavoriteListItem";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const FavoritesScreen = ({ navigation }) => {
  const toast = useToast();

  const { likedProducts, removeMultipleProductsFromLikes } =
    useContext(LikedProductsContext);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);

  useEffect(() => {
    if (
      favoriteProducts.length &&
      favoriteProducts.every((product) => checkedProducts.includes(product.id))
    ) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [checkedProducts]);

  const handleCheckAllChange = (isChecked) => {
    setIsCheckAll(isChecked);
    if (isChecked) {
      setCheckedProducts(favoriteProducts.map((product) => product.id));
    } else {
      setCheckedProducts([]);
    }
  };

  const handleCheckProduct = (productId, isChecked) => {
    if (isChecked) {
      setCheckedProducts([...checkedProducts, productId]);
    } else {
      setCheckedProducts(checkedProducts.filter((id) => id !== productId));
    }
  };

  const handleConfirmPress = () => {
    Alert.alert("Confirm", "Are you sure to remove the selected products?", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: async () => {
          await removeMultipleProductsFromLikes(checkedProducts);
          toast.show("Removed!", {
            type: "success",
          });

          setCheckedProducts([]);
        },
      },
    ]);
  };

  const favoriteProducts = data.filter((watch) =>
    likedProducts.includes(watch.id.toString())
  );

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Please add your first product to favorites.</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxhWrapper}>
          <View style={styles.textWrapper}>
            <Checkbox
              color={Colors.light.defaultColor}
              value={isCheckAll}
              onValueChange={handleCheckAllChange}
            />
            <Text style={styles.text}>Select all favorite products</Text>
          </View>
          <Button
            title={`Confirm (${checkedProducts.length})`}
            onPress={handleConfirmPress}
            disabled={checkedProducts.length === 0}
            color={Colors.light.defaultColor}
          />
        </View>
      </View>

      <FlatList
        data={favoriteProducts}
        renderItem={({ item }) => (
          <FavoriteListItem
            product={item}
            isChecked={checkedProducts.includes(item.id)}
            onCheck={handleCheckProduct}
            navigation={navigation}
          />
        )}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    flexDirection: "row",
  },
  text: {
    paddingLeft: 10,
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 10,
    height: 50,
  },
  checkboxhWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    justifyContent: "space-between",
    paddingHorizontal: 18,
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
});

export default FavoritesScreen;

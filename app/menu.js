import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import watches from "../assets/data/watches";
import ProductListItem from "../components/ProductListItem";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const MenuScreen = ({ navigation }) => {
  const { likedProducts } = useContext(LikedProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        // simulate network request
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || watches.length === 0) {
    return (
      <View style={styles.container}>
        <Text>There was an error loading your products.</Text>;
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={watches}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductListItem
            key={item.id}
            product={item}
            navigation={navigation}
            isLike={likedProducts.includes(item.id.toString())}
          />
        )}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
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
});

export default MenuScreen;

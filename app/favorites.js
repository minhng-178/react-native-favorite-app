import { useContext, useState, useEffect } from "react";

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import data from "../assets/data/db.json";
import FavoriteListItem from "../components/FavoriteListItem";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const FavoritesScreen = () => {
  const { likedProducts } = useContext(LikedProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const favoriteProducts = data.filter((watch) =>
    likedProducts.includes(watch.id.toString())
  );

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>There was an error loading your favorites.</Text>;
      </View>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Please add your first product to favorites.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteProducts}
      renderItem={({ item }) => <FavoriteListItem product={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavoritesScreen;

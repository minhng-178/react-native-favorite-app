import { useContext } from "react";
import { FlatList } from "react-native";

import watches from "../assets/data/watches";
import FavoriteListItem from "../components/FavoriteListItem";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const FavoritesScreen = () => {
  const { likedProducts } = useContext(LikedProductsContext);

  const favoriteProducts = watches.filter((watch) =>
    likedProducts.includes(watch.id.toString())
  );

  return (
    <FlatList
      data={favoriteProducts}
      renderItem={({ item }) => <FavoriteListItem product={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default FavoritesScreen;

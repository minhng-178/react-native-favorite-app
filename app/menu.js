import { useContext } from "react";
import { FlatList, View } from "react-native";

import watches from "../assets/data/watches";
import ProductListItem from "../components/ProductListItem";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const MenuScreen = ({ navigation }) => {
  const { likedProducts } = useContext(LikedProductsContext);

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

export default MenuScreen;

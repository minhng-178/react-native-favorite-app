import { FlatList, View } from "react-native";

import watches from "../assets/data/watches";
import ProductListItem from "../components/ProductListItem";

const MenuScreen = ({ navigation }) => {
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
          />
        )}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default MenuScreen;

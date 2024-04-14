import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import data from "../assets/data/db.json";
import ProductListItem from "../components/ProductListItem";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const MenuScreen = ({ navigation }) => {
  const { likedProducts } = useContext(LikedProductsContext);
  const [activeBrand, setActiveBrand] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const brands = [...new Set(data.map((item) => item.brandName))];

  const filteredData = data.filter(
    (item) => activeBrand === "" || item.brandName === activeBrand
  );

  useEffect(() => {
    const loadProduct = async () => {
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

    loadProduct();
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
        <Text>There was an error loading your products.</Text>;
      </View>
    );
  }

  return (
    <View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={brands}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeBrand, item)}
              onPress={() => {
                if (activeBrand === item) {
                  setActiveBrand("");
                } else {
                  setActiveBrand(item);
                }
              }}
            >
              <Text style={styles.tabText(activeBrand, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredData}
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
  tabsContainer: {
    width: "100%",
    margin: 10,
  },
  tab: (activeBrand, item) => ({
    backgroundColor: Colors.light.background,
    paddingVertical: 12 / 2,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor:
      activeBrand === item
        ? Colors.light.defaultColor
        : Colors.light.tabIconDefault,
  }),
  tabText: (activeBrand, item) => ({
    color: activeBrand === item ? Colors.light.defaultColor : Colors.light.text,
  }),
});

export default MenuScreen;

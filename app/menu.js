import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAndSearchedData, setFilteredAndSearchedData] = useState(data);

  const brands = [...new Set(data.map((item) => item.brandName))];

  useEffect(() => {
    let result = data;

    if (activeBrand !== "") {
      result = result.filter((item) => item.brandName === activeBrand);
    }

    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.watchName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAndSearchedData(result);
  }, [activeBrand, searchTerm]);

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name='search' color={"white"} size={24} />
        </TouchableOpacity>
      </View>

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
        data={filteredAndSearchedData}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductListItem
            key={item.id}
            product={item}
            navigation={navigation}
            isLike={likedProducts.includes(item.id.toString())}
          />
        )}
        contentContainerStyle={{ gap: 10, padding: 10, paddingBottom: 140 }}
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
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 10,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: Colors.light.background,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: Colors.light.defaultColor,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
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

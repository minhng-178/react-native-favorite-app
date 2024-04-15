import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";

export const LikedProductsContext = createContext();

const LikedProductsProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const products =
          JSON.parse(await AsyncStorage.getItem("SE162107")) || [];
        setLikedProducts(products);
      } catch (error) {
        Alert.alert(error);
      }
    };
    fetchLikedProducts();
  }, []);

  const addProductToLikes = async (productId) => {
    const newLikedProducts = [...likedProducts, productId];
    setLikedProducts(newLikedProducts);
    await AsyncStorage.setItem("SE162107", JSON.stringify(newLikedProducts));
  };

  const removeProductFromLikes = async (productId) => {
    const newLikedProducts = likedProducts.filter((id) => id !== productId);
    setLikedProducts(newLikedProducts);
    await AsyncStorage.setItem("SE162107", JSON.stringify(newLikedProducts));
  };

  const removeMultipleProductsFromLikes = async (productIds) => {
    const newLikedProducts = likedProducts.filter(
      (id) => !productIds.includes(id)
    );
    setLikedProducts(newLikedProducts);
    await AsyncStorage.setItem("SE162107", JSON.stringify(newLikedProducts));
  };

  return (
    <LikedProductsContext.Provider
      value={{
        likedProducts,
        addProductToLikes,
        removeProductFromLikes,
        removeMultipleProductsFromLikes,
      }}
    >
      {children}
    </LikedProductsContext.Provider>
  );
};

export default LikedProductsProvider;

export const useLikedProducts = () => useContext(LikedProductsContext);

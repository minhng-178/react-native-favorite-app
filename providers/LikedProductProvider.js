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

  return (
    <LikedProductsContext.Provider value={{ likedProducts, setLikedProducts }}>
      {children}
    </LikedProductsContext.Provider>
  );
};

export default LikedProductsProvider;

export const useLikedProducts = () => useContext(LikedProductsContext);

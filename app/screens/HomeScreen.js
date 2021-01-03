import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import Screen from '../components/Screen';
import Text from '../components/texts/Text';
import SearchBar from '../components/forms/SearchBar';
import TextCategory from '../components/texts/TextCategory';
import Button from '../components/buttons/Button';
import Card from '../components/cards/Card';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import productApi from '../api/product';
import categoryApi from '../api/category';
import cartApi from '../api/cart';
import shprApi from '../api/shoppingProduct';
import routes from '../navigation/routes';
import calcTotal from '../utility/calcTotal';

function HomeScreen({navigation}) {
  const {user} = useAuth();
  const {setCartId, setInitialCartItems} = useCart();

  const [category, setCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState();

  const getProductsByCategoryApi = useApi(productApi.getProductsByCategory);
  const getProductsByQueryApi = useApi(productApi.getProductsByQuery);
  const getCategoryApi = useApi(categoryApi.getCategories);
  const getCartApi = useApi(cartApi.getCurrCartCustomer);
  const getShprApi = useApi(shprApi.getShoppingProductsByEnableCart);

  useEffect(() => {
    getProductsByCategoryApi.request({catId: category});
    getCategoryApi.request();
    getCartApi.request({email: user.info.email});
    getShprApi.request({email: user.info.email});
  }, []);

  useEffect(() => {
    if (getShprApi.data.data !== undefined && getShprApi.data.data.length > 0) {
      setInitialCartItems(calcTotal.quantity(getShprApi.data.data));
    }
  }, [getShprApi.data.data]);

  useEffect(() => {
    if (getCartApi.data.data !== undefined) {
      setCartId(getCartApi.data.data.car_id);
    }
  }, [getCartApi.data.data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    getProductsByQueryApi.request({query});
  };

  const handleCategory = (catId) => {
    setCategory(catId);
    getProductsByCategoryApi.request({catId});
  };

  const renderProducts = () => {
    let isSearching = searchQuery !== undefined && searchQuery !== '';

    if (isSearching) {
      if (
        getProductsByQueryApi.data.data === undefined ||
        getProductsByQueryApi.data.data.length === 0
      ) {
        return <Text>No results for this search.</Text>;
      }
    }

    return (
      <FlatList
        data={
          isSearching
            ? getProductsByQueryApi.data.data
            : getProductsByCategoryApi.data.data
        }
        keyExtractor={(product) => product.pro_id.toString()}
        renderItem={({item}) => (
          <Card
            title={item.name}
            subtitle={item.price}
            imageUrl={item.images[0].path}
            onPress={() => navigation.navigate(routes.PRODUCT_DETAIL, item)}
          />
        )}
      />
    );
  };

  return (
    <>
      <ActivityIndicator
        visible={
          getProductsByCategoryApi.loading ||
          getCategoryApi.loading ||
          getProductsByQueryApi.loading
        }
      />

      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="What are you looking for?"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <FlatList
        horizontal
        data={getCategoryApi.data.data}
        keyExtractor={(category) => category.cat_id.toString()}
        renderItem={({item}) => (
          <TextCategory
            active={item.cat_id === category}
            onPress={() => handleCategory(item.cat_id)}>
            {item.name}
          </TextCategory>
        )}
        style={styles.categoriesContainer}
      />

      <Screen>
        {getProductsByCategoryApi.error && (
          <>
            <Text style={{textAlign: 'center'}}>
              Couldn't retrieve products.
            </Text>
            <Button title="Retry" onPress={getProductsByCategoryApi.request} />
          </>
        )}

        {renderProducts()}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    minHeight: 30,
    maxHeight: 30,
    marginLeft: 16,
    marginTop: 30,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginTop: 25,
  },
});

export default HomeScreen;

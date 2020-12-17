import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import Screen from '../components/Screen';
import Text from '../components/Text';
import SearchBar from '../components/forms/SearchBar';
import TextCategory from '../components/TextCategory';
import Button from '../components/Button';
import Card from '../components/Card';
import useApi from '../hooks/useApi';
import productApi from '../api/product';
import categoryApi from '../api/category';
import routes from '../navigation/routes';

function HomeScreen({navigation}) {
  const [category, setCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState();
  const getProductsByCategoryApi = useApi(productApi.getProductsByCategory);
  const getProductsByQueryApi = useApi(productApi.getProductsByQuery);
  const getCategoryApi = useApi(categoryApi.getCategories);

  useEffect(() => {
    getProductsByCategoryApi.request({catId: category});
    getCategoryApi.request();
  }, []);

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

      <Screen>
        <SearchBar
          placeholder="What are you looking for?"
          onChangeText={handleSearch}
          value={searchQuery}
        />

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

        {getProductsByCategoryApi.error && (
          <>
            <Text>Couldn't retrieve products.</Text>
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
    marginVertical: 30,
  },
});

export default HomeScreen;

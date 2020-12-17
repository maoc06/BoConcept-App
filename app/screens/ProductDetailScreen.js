import React from 'react';

import Screen from '../components/Screen';
import Text from '../components/Text';

function ProductDetailScreen({route}) {
  const product = route.params;

  return (
    <Screen>
      <Text>Product Detail Screen</Text>
      <Text>{product.name}</Text>
    </Screen>
  );
}

export default ProductDetailScreen;

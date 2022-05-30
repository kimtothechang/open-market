import styled from '@emotion/styled';
import { useState, useEffect, memo } from 'react';
import { useRecoilValue } from 'recoil';
import { searchValueState, searchValidState } from '../../store';


import { BASIC_PAGE_WIDTH } from '../../constants';
import ItemCard from './ItemCard';
import { fetcher } from '../../utils/fetcher';
import Loading from '../common/Loading';

const ItemList = () => {
  const [originProducts, setOriginProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const searchValue = useRecoilValue(searchValueState);
  const searchValid = useRecoilValue(searchValidState);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const products = await fetcher('/products/', 'GET');

    setLoading(false);
    setOriginProducts([...products.results]);
    setProducts([...products.results]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (searchValid) {
      if (searchValue !== '') {
        setProducts(originProducts.filter((product) => product.product_name.search(searchValue) !== -1));
      } else {
        setProducts(originProducts);
      }
    }
  }, [searchValid]);

  return (
    <ItemListWrapper>
      {loading ? <Loading/> : 
      <FlexBox>
        {products.map((product) => (
          <ItemCard
            key={product.product_id}
            id={product.product_id}
            img={product.image}
            seller={product.seller_store}
            product={product.product_name}
            price={product.price}
            alt={product.product_name}
          />
        ))}
      </FlexBox>}
    </ItemListWrapper>
  );
};

export default memo(ItemList);

const ItemListWrapper = styled.article`
  margin: 0px auto;
  margin-top: 80px;
  margin-bottom: 180px;
  max-width: ${BASIC_PAGE_WIDTH};
  padding: 16px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
`;

import styled from '@emotion/styled';

import CartItem from './CartItem';

import { BASIC_PAGE_WIDTH } from '../../constants';

const CartList = ({ setProducts, products }) => {
  return (
    <CartListWrapper>
      <CartListMain>
        {products.map((product) => (
          <CartItem
            key={product.product_id}
            image={product.image}
            seller={product.seller_store}
            name={product.product_name}
            price={product.price}
            shippingFee={product.shipping_fee}
            quantity={product.quantity}
            setState={setProducts}
            cartId={product.cart_item_id}
            productId={product.product_id}
            stock={product.stock}
            isActive={product.is_active}
          />
        ))}
      </CartListMain>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;
  max-width: ${BASIC_PAGE_WIDTH};
`;

const CartListMain = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 70px;
`;

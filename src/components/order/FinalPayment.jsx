import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderShippingInfo, orderUserInfo, orderKindInfo, oneOrderState, totalPayment } from '../../store';

import PaymentSummary from './common/PaymentSummary';

import { ColorObject } from '../../constants';
import { BASIC_SERVER_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const FinalPayment = () => {
  const navigate = useNavigate();
  const totalPrice = useRecoilValue(totalPayment);
  const userInfo = useRecoilValue(orderUserInfo);
  const [shippingInfo, setShippingInfo] = useRecoilState(orderShippingInfo);
  const orderKindState = useRecoilValue(orderKindInfo);
  const [approve, setApprove] = useState(false);
  const oneOrder = useRecoilValue(oneOrderState);

  const handleAgree = () => {
    setShippingInfo((current) => {
      return { ...current, agree: !current.agree };
    });
  };

  const LiveValidCheck = (data1, data2) => {
    if (!!data1) {
      for (let key in data1) {
        if (!data1[key]) {
          setApprove(false);
          return;
        }
      }
    }
    if (!!data2) {
      for (let key in data2) {
        if (!data2[key]) {
          setApprove(false);
          return;
        }
      }
    }
    setApprove(true);
    return;
  };

  const orderDirectOrder = async (product, user, price) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASIC_SERVER_URL}/order/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        product_id: product.product_id,
        quantity: product.quantity,
        order_kind: orderKindState,
        total_price: product.price * product.quantity + product.shipping_fee,

        receiver: user.name,
        receiver_phone_number: user.phone,
        address: user.address,
        address_message: user.message,
        payment_method: user.payment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data) {
        alert('????????? ????????? ?????? ??????????????????.');
      }
    } else {
      alert('??????????????? ??????????????????.');
    }

    console.log(data);
    navigate('/');
  };

  const orderCartOrder = async (user, price) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASIC_SERVER_URL}/order/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        total_price: price,
        order_kind: orderKindState,

        receiver: user.name,
        receiver_phone_number: user.phone,
        address: user.address,
        address_message: user.message,
        payment_method: user.payment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data) {
        alert('????????? ????????? ?????? ??????????????????.');
      }
    } else {
      alert('??????????????? ??????????????????.');
    }

    console.log(data);
    navigate('/');
  };

  const orderCartOneOrder = async (product, user) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASIC_SERVER_URL}/order/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        product_id: product.product_id,
        quantity: product.quantity,
        order_kind: orderKindState,
        total_price: product.price * product.quantity + product.shipping_fee,

        receiver: user.name,
        receiver_phone_number: user.phone,
        address: user.address,
        address_message: user.message,
        payment_method: user.payment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data) {
        alert('????????? ????????? ?????? ??????????????????.');
      }
    } else {
      alert('??????????????? ??????????????????.');
    }

    console.log(data);
    navigate('/');
  };

  const postOrder = async (product, user, price) => {
    if (orderKindState === 'cart_order') {
      orderCartOrder(user, price);
    } else if (orderKindState === 'cart_one_order') {
      orderCartOneOrder(product, user);
    } else if (orderKindState === 'direct_order') {
      orderDirectOrder(product, user);
    } else {
      console.log('????????? ?????? ???????????????.');
    }
  };

  useEffect(() => {
    LiveValidCheck(userInfo, shippingInfo);
  }, [userInfo, shippingInfo]);

  return (
    <FinalPaymentWrapper buttonColor={approve}>
      <div>
        <PaymentSummary text="????????????" price={totalPrice} />
        <PaymentSummary text="????????????" price="0" />
        <PaymentSummary text="?????????" price="0" />
        <Line />
        <PaymentSummary text="????????????" price={totalPrice} color="#eb5757" size="24px" weight="700" />
      </div>
      <div>
        <div>
          <label>
            <input type="checkbox" checked={shippingInfo.agree} onChange={() => handleAgree()} />
            ?????? ????????? ??????????????????, ?????? ?????? ?????? ???????????????.
          </label>
        </div>
        <div>
          <button onClick={() => postOrder(oneOrder, shippingInfo, totalPrice)} disabled={!approve}>
            ????????????
          </button>
        </div>
      </div>
    </FinalPaymentWrapper>
  );
};

export default FinalPayment;

const FinalPaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 30px;
  border: 2px solid ${ColorObject.basic};
  border-radius: 10px;

  & > div:first-of-type {
    overflow: hidden;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;

    & > div:first-of-type {
      display: flex;
      align-items: center;

      & > label {
        font-size: 16px;
        font-weight: 400;
      }
      & > label > input {
        margin-right: 10px;
      }
    }
    & > div:last-of-type {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      & > button {
        padding: 19px 65.5px;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 24px;
        font-weight: 700;
        background-color: ${(props) => (props.buttonColor ? ColorObject.basic : '#c4c4c4')};
      }
    }
  }
`;

const Line = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 29px;
  border-bottom: 1px solid #c4c4c4;
`;

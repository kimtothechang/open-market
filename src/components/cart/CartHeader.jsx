import styled from "@emotion/styled";

import { ColorObject } from "../../constants";

const CartHeader = ({ allCheck, handleAllCheck }) => {
  return <CartHeaderWrapper>
    <div>
      <input type="checkbox" id='allcheck' onChange={handleAllCheck} value={allCheck} />
      <label for='allcheck'></label>
      <p>상품정보</p>
    </div>
    <div>
      <p>수량</p>
      <p>상품금액</p>
    </div>
  </CartHeaderWrapper>
}

export default CartHeader;


const CartHeaderWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-top: 19px;
  padding-bottom: 18px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
  background-color: #f2f2f2;

  & > div:first-of-type {
    display: flex;
    width: 59%;
    min-width: 377px;
    flex-grow: 1;

    & > input {
      max-width: 0%;
      flex-grow: 1;
    }
    & > p {
      text-align: center;
      max-width: 100%;
      flex-grow: 1;
    }


  & > input[type='checkbox'] {
    display: none;
  }

  & > label {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid ${ColorObject.basic};
    border-radius: 10px;
    cursor: pointer;
  }

  & > input:checked + label:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: ${ColorObject.basic};
  }
  }
  & > div:last-of-type {
    display: flex;
    justify-content: space-between;
    width: 41%;
    min-width: 377px;
    flex-grow: 1;

    & > p:first-of-type {
      text-align: center;
      width: 35%;
    }
    & > p:last-of-type {
      text-align: center;
      width: 60%;
    }
  }
`;
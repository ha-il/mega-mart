import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* 핵심
  1. DOM 업데이트와 비즈니스 규칙은 분리되어야 한다.
  2. 전역 변수에 의존하면 안 된다.
  3. 계산은 명시적 입력과 명시적 출력만으로 이뤄진다.
*/

/* 원칙
  1. 암묵적 입력과 출력은 적을수록 좋다.
  2. 설계는 엉켜있는 코드를 푸는 것이다.
*/
interface Item {
  id: number;
  name: string;
  emoji: string;
  price: number;
}

function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [cartState, setCartState] = useState<Item[]>([]);

  // 유틸:
  const addElementLast = <T,>(array: T[], elem: T) => [...array, elem];
  // 계산:
  // C: 카트에 대한 구조를 알아야 함
  const addItem = (cart: Item[], item: Item) => addElementLast(cart, item);
  // 액션: DOM을 변경하기 때문에
  const addItemToCart = (item: Item) => {
    if (cartState.find((element) => element.name === item.name)) return;
    const shoppingCart = addItem(cartState, item);
    setCartState(shoppingCart);
  };
  // 액션: 하위 함수가 DOM을 변경하는 액션이기 때문에
  const handleAddButtonClick = (item: Item) => {
    addItemToCart(item);
  };

  // 유틸:
  const removeItem = <T,>(array: T[], idx: number) => {
    const copy = [...array];
    copy.splice(idx, 1);
    return copy;
  };
  // 계산:
  // const removeItem = (cart: Item[], name: string) =>
  // cart.filter((item) => item.name !== name);
  // 액션: DOM을 변경하기 때문에
  const removeItemByIndex = (index: number) => {
    const shoppingCart = removeItem(cartState, index);
    setCartState(shoppingCart);
  };
  // 액션: 하위 함수가 DOM을 변경하는 액션이기 때문에
  const handleRemoveButtonClick = (index: number) => {
    removeItemByIndex(index);
  };

  // 계산: C I B
  // C: 카트에 대한 구조를 알아야 함
  // I: 상품에 대한 구조를 알아야 함
  // B: 합계를 결정하는 비즈니스 규칙을 알아야 함(?)
  const calcTotal = (cart: Item[]) =>
    cart.reduce((acc, cur) => acc + cur.price, 0);
  // 액션: cart를 참조하고 있으므로
  const cartTotal = calcTotal(cartState);

  // 계산:
  // B: 세금 계산이라는 비즈니스 규칙을 알아야 함
  const calcTax = (price: number) => price * 0.1;
  // 액션: DOM을 변경하기 때문에
  const updateTaxDom = (total: number) => calcTax(total);

  // 계산:
  // B: 2만원 이상 무료배송이라는 비즈니스 규칙을 알아야 함
  const getsFreeShipping = (cart: Item[]) => calcTotal(cart) >= 20000;
  // 액션: DOM을 변경하기 때문에
  const updateShippingIcons = (cart: Item[]) => getsFreeShipping([...cart]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch("http://localhost:5000/items");
      const data = await response.json();
      setItems(data);
    };
    getItems();
  }, []);

  return (
    <div className="App">
      <Header>
        <h1>MegaMart</h1>
        <div>
          {updateShippingIcons(cartState) && <div>무료 배송!</div>}
          <span>{cartTotal}원</span>
          <div>부가세: {updateTaxDom(cartTotal)}원</div>
        </div>
      </Header>
      <Main>
        <h2>장바구니: 2만원 이상 구매시 무료 배송!</h2>
        <Ul>
          {cartState.map((item, index) => (
            <Li key={item.id}>
              <div>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
                <span>{item.price}원</span>
              </div>
              <Button
                type="button"
                onClick={() => handleRemoveButtonClick(index)}
              >
                삭제
              </Button>
            </Li>
          ))}
        </Ul>
        <h2>상품 목록</h2>
        <Ul>
          {items.map((item) => (
            <Li key={item.id}>
              <div>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
                <span>{item.price}원</span>
              </div>
              <Button type="button" onClick={() => handleAddButtonClick(item)}>
                장바구니 추가
              </Button>
            </Li>
          ))}
        </Ul>
      </Main>
    </div>
  );
}
export default HomePage;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 3px solid #e74c3c;
`;

const Main = styled.main`
  padding: 0 1rem;
`;

const Ul = styled.ul`
  padding: 0;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  background-color: #ecf0f1;
  padding: 1rem;
  border-radius: 0.5rem;

  & span {
    margin-right: 1rem;
  }
`;

const Button = styled.button`
  border: none;
  border: 2px solid #e74c3c;
  background-color: #e74c3c;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  &:hover {
    color: #ecf0f1;
    background-color: #c0392b;
  }
`;

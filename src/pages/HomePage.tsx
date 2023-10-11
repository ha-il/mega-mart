import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* 핵심
  1. DOM 업데이트와 비즈니스 규칙은 분리되어야 한다.
  2. 전역 변수에 의존하면 안 된다.
  3. 계산은 명시적 입력과 명시적 출력만으로 이뤄진다.
*/
interface Item {
  id: number;
  name: string;
  emoji: string;
  price: number;
}

function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);

  // 계산
  const calcTotal = (array: Item[]) =>
    array.reduce((acc, cur) => acc + cur.price, 0);
  // 계산
  const calcTax = (price: number) => price * 0.1;

  // 액션: cart라는 상태를 읽고 있으니까.
  const cartTotal = calcTotal(cart) + calcTax(calcTotal(cart));

  // 액션: 하위 함수가 액션이기 때문에
  const handleButtonClick = (item: Item) => {
    addItemToCart(item);
  };

  // 액션: DOM을 변경하기 때문에
  const addItemToCart = (item: Item) => {
    setCart(addItem(cart, item));
  };

  // 계산
  const addItem = (array: Item[], item: Item) => [...array, item];

  // 액션: cartTotal이라는 상태를 읽고 있으니까.
  const updateShippingIcons = (price: number) =>
    getsFreeShipping(price, cartTotal);

  // 계산
  const getsFreeShipping = (total: number, price: number) =>
    total + price >= 20000;

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
        <span>{cartTotal}원</span>
      </Header>
      <main>
        <Ul>
          {items.map((item) => (
            <Li key={item.id}>
              <div>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
                <span>{item.price}원</span>
                {updateShippingIcons(item.price) && <span>무료 배송!</span>}
              </div>
              <Button type="button" onClick={() => handleButtonClick(item)}>
                장바구니 추가
              </Button>
            </Li>
          ))}
        </Ul>
      </main>
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

const Ul = styled.ul`
  padding: 0 1rem;
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

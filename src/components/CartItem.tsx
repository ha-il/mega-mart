import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Li from "./Li";
import Item from "../interfaces/Item";

interface CartItemProps {
  item: Item;
  index: number;
  onRemoveButtonClick: (index: number) => void;
}

function CartItem({ item, index, onRemoveButtonClick }: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number(e.target.value));
  };

  return (
    <Li key={item.id}>
      <div>
        <span>{item.emoji}</span>
        <span>{item.name}</span>
        <span>{item.price}원</span>
      </div>
      <div>
        <Input
          type="number"
          value={itemQuantity}
          onChange={handleInputChange}
        />
        <Button type="button" onClick={() => onRemoveButtonClick(index)}>
          삭제
        </Button>
      </div>
    </Li>
  );
}
export default CartItem;

const Input = styled.input`
  width: 2rem;
  margin-right: 1rem;
`;

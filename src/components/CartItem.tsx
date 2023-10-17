import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Button from "./Button";
import Li from "./Li";
import ItemInCart from "../interfaces/CartItem";

interface CartItemProps {
  item: ItemInCart;
  index: number;
  onInputChange: (value: number, index: number) => void;
  onRemoveButtonClick: (index: number) => void;
}

function CartItem({
  item,
  index,
  onInputChange,
  onRemoveButtonClick,
}: CartItemProps) {
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
          value={item.quantity}
          min={1}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onInputChange(Number(e.target.value), index)
          }
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

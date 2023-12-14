import styles from './AddToCard.module.scss';
import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';

type Props = {
  added?: boolean;
  id: string;
};

const AddToCard: React.FC<Props> = ({ added = false, id }) => {
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(addToCart(id));
  };

  const handleClickRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <button
      className={cn(styles.add_to_card, { [styles.add_to_card__added]: added })}
      type="button"
      onClick={added ? handleClickRemove : handleClickAdd}
    >
      {added ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
export default AddToCard;

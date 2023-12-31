import styles from './AddToCard.module.scss';
import React from 'react';
import cn from 'classnames';
import {
  addToCart,
  removeFromCart,
  selectCartProducts,
} from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SyncUserDataWithServer } from '../../utils/helpers/SyncUserDataWithServer';
import { selectUser } from '../../store/userSlice';

type Props = {
  added?: boolean;
  id: string;
  category: string;
  showModal: () => void;
};

const AddToCard: React.FC<Props> = ({
  added = false,
  id,
  category,
  // showModal,
}) => {
  const dispatcher = useAppDispatch();
  const cartInBrowser = useAppSelector(selectCartProducts);

  const user = useAppSelector(selectUser);

  const handleClickAdd = () => {
    dispatcher(addToCart({ id, category }));

    const cart = JSON.stringify({
      cart: [
        ...cartInBrowser,
        {
          name: id,
          category,
          quantity: 1,
        },
      ],
    });

    user && SyncUserDataWithServer(cart, 'cart');
  };

  const handleClickRemove = () => {
    dispatcher(removeFromCart(id));
    const cart = JSON.stringify({
      cart: cartInBrowser.filter((item) => item.name !== id),
    });

    user && SyncUserDataWithServer(cart, 'cart');
  };

  return (
    <button
      className={cn(styles.add_to_card, {
        [styles.add_to_card__added]: added,
      })}
      type="button"
      onClick={added ? handleClickRemove : handleClickAdd}
    >
      {added ? 'Added to cart' : 'Add to cart'}
    </button>
  );
  //  user ? (
  // <button
  //   className={cn(styles.add_to_card, {
  //     [styles.add_to_card__added]: added,
  //   })}
  //   type="button"
  //   onClick={added ? handleClickRemove : handleClickAdd}
  // >
  //   {added ? 'Added to cart' : 'Add to cart'}
  // </button>
  // ) : (
  //   <button
  //     className={cn(styles.add_to_card, {
  //       [styles.add_to_card__added]: added,
  //     })}
  //     type="button"
  //     onClick={showModal}
  //   >
  //     {added ? 'Added to cart' : 'Add to cart'}
  //   </button>
  // );
};

export default AddToCard;

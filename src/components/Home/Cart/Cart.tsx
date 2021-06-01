import { CartItemType } from "../../../App";
import { CartItem } from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
    return (
        <Wrapper>
            <h2>Your Cart</h2>
            {
                cartItems.length === 0 ? <p>No items in Cart :(</p> : null
            }
            {
                cartItems.map(item => <CartItem
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />)
            }
        </Wrapper>
    )
}

export default Cart;
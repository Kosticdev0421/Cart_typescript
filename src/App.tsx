import { Badge, Drawer, Grid, LinearProgress } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useState } from 'react';
import { useQuery } from 'react-query';
// Styles
import { StyledButton, Wrapper } from './App.styles';
import Cart from './components/Home/Cart/Cart';
import Item from './components/Home/Item/Item';


// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
   return await( await(await (fetch('http://fakestoreapi.com/products'))).json());
}

const App = ()  =>{
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]) => (
    items.reduce((total, item) => total + item.amount, 0)
  );
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
        // 1. Is the item already added in the cart?
        const isItemInCart = prev.find((item) => item.id === clickedItem.id);

        if (isItemInCart) {
            return prev.map((item) =>
                item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
            );
        }
        // First time the item is added
        return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
      setCartItems((prev) =>
          prev.reduce((remainingItems, item) => {
              if (item.id === id) {
                  if (item.amount === 1) return remainingItems;
                  return [...remainingItems, { ...item, amount: item.amount - 1 }];
              } else {
                  return [...remainingItems, item];
              }
          }, [] as CartItemType[])
      );
  };

    const CartContainer = () => (
        <>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                  cartItems={cartItems}
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCart />
                </Badge>
            </StyledButton>
        </>
    );


  if(isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong!</div>

  return (
    <Wrapper>
      <CartContainer />
      <Grid container spacing={3}>
        {
          data && data.map(item => (
            <Grid item key={item.id} xs={12} sm={6} lg={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );

}

export default App;

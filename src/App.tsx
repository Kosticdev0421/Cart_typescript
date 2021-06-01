import { Badge, Drawer, Grid, LinearProgress } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useState } from 'react';
import { useQuery } from 'react-query';
// Styles
import { StyledButton, Wrapper } from './App.styles';
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
  const handleAddToCart = () => null;
  const handleRemoveFromCart = () => null;

    const CartContainer = () => (
        <>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                Cart here!
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

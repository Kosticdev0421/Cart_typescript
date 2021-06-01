import { Grid, LinearProgress } from '@material-ui/core';
import { useQuery } from 'react-query';
// Styles
import { Wrapper } from './App.styles';
import Item from './components/Item/Item';


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

  const getTotalItems = () => null;
  const handleAddToCart = () => null;
  const handleRemoveFromCart = () => null;


  if(isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong!</div>

  return (
    <Wrapper>
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

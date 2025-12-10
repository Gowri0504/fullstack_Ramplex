import React,{ useState, useEffect } from 'react';  
import axios from 'axios';
import { use } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products') 
      .then(response => {   
        setProducts(response.data);
      })
      .catch(error => {   
        console.error('There was an error fetching the products!', error);
      });   
    }, []);

  return (
    <div>
      <h2>Product List</h2> 
        <ul>    
            {products.map(product => ( 
                <li key={product.id}>{product.title} <img src={product.image} alt={product.title} style={{width: '50px', height: '50px'}} /> - ${product.price}</li>
            ))}  
        </ul> 
    </div>
  );
}

export default Product;     
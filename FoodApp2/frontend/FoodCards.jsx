import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FoodCards() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/read")
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      flexWrap: 'wrap',
      padding: '20px'
    }}>
      {foods.map((food) => (
        <Card key={food._id} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://source.unsplash.com/featured/?food"
            title={food.foodname}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {food.foodname}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Days Since Ate: {food.daySinceIAte}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Update</Button>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

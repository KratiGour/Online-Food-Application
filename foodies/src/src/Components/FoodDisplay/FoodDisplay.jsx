import React, { useContext } from 'react';
import { StoreContext } from "../../Pages/Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoods = foodList.filter(food =>
    (category === 'All' || food.category === category) &&
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem
              key={food._id || index}
              _id={food._id}
              name={food.name}
              description={food.description}
              price={food.price}
              imageUrl={
                food.imageUrl
                  ? food.imageUrl
                  : `http://foodies.s3-website-us-east-1.amazonaws.com/${food.image}`
              }
            />
          ))
        ) : (
          <div className="text-center text-muted mt-5">
            <h4>No food items found for the selected category or search.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;

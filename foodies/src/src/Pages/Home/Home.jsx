import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <main className="container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}searchText={''} />
    </main>
  );
};

export default Home;

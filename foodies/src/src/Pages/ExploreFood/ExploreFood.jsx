import React, { useState } from 'react';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';

const Explore = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <select
                  className="form-select"
                  style={{ maxWidth: '180px' }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Curry">Curry</option>
                  <option value="Rice">Rice</option>
                  <option value="Cake">Cake</option>
                  <option value="Ice Cream">Ice Cream</option>
                </select>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search your favorite dish..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <FoodDisplay category={category} searchText={searchText} />
    </>
  );
};

export default Explore;

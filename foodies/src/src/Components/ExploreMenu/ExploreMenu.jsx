import React, { useRef } from 'react';
import { categories } from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    menuRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    menuRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleCategoryClick = (selectedCategory) => {
    if (category === selectedCategory) {
      setCategory('All');
    } else {
      setCategory(selectedCategory);
    }
  };

  return (
    <div className="explore-menu position-relative">
      <h1 className="d-flex align-items-center justify-content-between">
        Explore Our Menu
        <div className="d-flex">
          <i className="bi bi-arrow-left-circle scroll-icon" onClick={scrollLeft}></i>
          <i className="bi bi-arrow-right-circle scroll-icon" onClick={scrollRight}></i>
        </div>
      </h1>
      <p>Explore curated lists of dishes from top categories</p>

      <div
        className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list"
        ref={menuRef}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className={`text-center explore-menu-list-item ${
              category === item.category ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick(item.category)}
          >
            <img
              src={item.icon}
              alt={item.category}
              className="rounded-circle"
              width={100}
              height={100}
            />
            <p className="mt-2 fw-bold">{item.category}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

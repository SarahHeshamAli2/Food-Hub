import React from 'react';
import './RecipeLoader.css';

const RecipeLoader = () => {
  return (
    <div className="recipe-loader-container">
      <div className="recipe-loader">
        <div className="utensil spoon">
          <div className="handle"></div>
          <div className="bowl"></div>
        </div>
        <div className="utensil fork">
          <div className="handle"></div>
          <div className="head"></div>
        </div>
        <div className="utensil knife">
          <div className="handle"></div>
          <div className="blade"></div>
        </div>
        <div className="plate">
          <div className="food-item pizza"></div>
          <div className="food-item herb"></div>
          <div className="food-item vegetable"></div>
        </div>
      </div>
      <p className="loader-text">Preparing your recipe...</p>
    </div>
  );
};

export default RecipeLoader;
import "../App.css";
import React from 'react';
import { NavLink } from 'react-router-dom';

const Mealcard = ({ detail }) => {
  console.log("Mealcard Data:", detail);

  return (
    <div className='meals'> 
      {!detail || detail.length === 0 ? (
        <p>No meals found</p>
      ) : (
        detail.map((curItem) => {
          console.log("ID passed to Mealinfo:", curItem.id); // Confirm ID is present
          return (
            <div className='mealImg' key={curItem.id}>
              <img src={curItem.image_url} alt={curItem.title} />
              <p>{curItem.title}</p>
              <NavLink to={`/meal/${curItem.id || curItem.idMeal}`}>
                <button>Recipe</button>
              </NavLink>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Mealcard;

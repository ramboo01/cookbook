import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../App.css";

const Mealinfo = () => {
  const { id } = useParams(); // This must match the route param
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const jsonData = await res.json();
        console.log("Mealinfo API Response:", jsonData);

        if (!jsonData.data || !jsonData.data.recipe) {
          console.warn("No valid recipe returned from API.");
          return;
        }

        setInfo(jsonData.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe data: ", error);
      }
    };

    if (id) {
      console.log("Meal ID from URL:", id);
      getInfo();
    }
  }, [id]);

  if (!info) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading or No Data Found</div>;
  }

  return (
    <div className='mealInfo'>
      <img src={info.image_url} alt={info.title} />
      <div>
        <h1>{info.title}</h1>
        <h3>Ingredients:</h3>
        <ul>
          {info.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.description || ingredient}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p>
          Instructions not available.{" "}
          <a href={info.source_url} target="_blank" rel="noopener noreferrer">
            View full recipe here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Mealinfo;

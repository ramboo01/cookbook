import React, { useState, useEffect } from 'react';
import Mealcard from './Mealcards';
import { Link, useNavigate } from 'react-router-dom';


const Mainpage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchRecipes = async (query) => {
    try {
      const get = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
      const jsonData = await get.json();

      if (jsonData.data.recipes.length === 0) {
        alert("No recipes found!");
        setData([]);  // Clear data if no recipes
      } else {
        setData(jsonData.data.recipes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Failed to fetch recipes.");
    }
  };

  useEffect(() => {
    // Fetch default recipes on mount, e.g. 'pizza'
    fetchRecipes('pizza');
  }, []);

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myfun = () => {
    if (search.trim() === "") {
      alert("Please Enter Something");
    } else {
      fetchRecipes(search);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/ae">Home</Link>
          <Link to="/recipe">Create Recipe</Link>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className='container'>
        <div className='searchBar'>
          <input type='text' placeholder='Enter Dish' onChange={handleInput} />
          <button onClick={myfun}>Search</button>
        </div>

        <div>
          {data.length > 0 ? (
            <Mealcard detail={data} />
          ) : (
            <p>No meals found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;

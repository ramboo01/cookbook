import React, { useState } from 'react';
import axios from 'axios';
 import './recipe.css'; 

const Recipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName || !ingredients || !instructions) {
      setMessage('❌ Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/recipes', {
        name: recipeName,
        ingredients,
        instructions,
        thumbnail: thumbnailUrl,
      });
      setMessage('✅ Recipe added successfully!');
      // Clear form
      setRecipeName('');
      setIngredients('');
      setInstructions('');
      setThumbnailUrl('');
    } catch (error) {
      console.error('❌ Error adding recipe:', error);
      setMessage('❌ Failed to add recipe. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Add a New Recipe</h2>

        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          style={styles.textarea}
          required
        />

        <textarea
          placeholder="Cooking Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          style={styles.textarea}
          required
        />

        <input
          type="url"
          placeholder="Thumbnail Image URL (optional)"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Submit</button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

// ✅ Inline styles for simplicity
const styles = {
  container: {
    paddingTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  },
  form: {
    width: '400px',
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  }
};

export default Recipe;

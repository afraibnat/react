/*
This component will have a search input that holds 
the name of the person taking the quiz for personalization
*/
import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  function handleChange(e) {
    setInputName(e.target.value);
  }

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="My name is..." 
              onChange={handleChange} 
              value={inputName}></input>
            <button type="submit">Start Quiz</button>
        </form>
    </div>   
  );
}
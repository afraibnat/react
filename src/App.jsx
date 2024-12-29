import { useState, useEffect } from 'react'
import './App.css';
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import { UserProvider } from './components/UserContext';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [dogImage, setDogImage] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Purple 💜", "Pink 🩷", "White 🤍", "Yellow 💛"],
    },
    {
      question: "What is your favorite food?",
      options: ["Dessert 🍨", "Seafood 🦞", "Burger 🍔", "Buldak Ramen 🍜"]
    },
    {
      question: "Which animal do you prefer?",
      options: ["Panda 🐼", "Whale 🐋", "Penguin 🐧", "Lion 🦁"]
    },
    {
      question: "What is your favorite hobby?",
      options: ["Crocheting 🧶", "Reading 📖", "Gaming 🎮", "Traveling ✈️"]
    }
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Pink 🩷": "Fire",
    "Purple 💜": "Water",
    "White 🤍": "Earth",
    "Yellow 💛": "Air",
    "Dessert 🍨": "Air", 
    "Seafood 🦞": "Water", 
    "Burger 🍔": "Earth", 
    "Buldak Ramen 🍜": "Fire",
    "Panda 🐼": "Earth", 
    "Whale 🐋": "Water", 
    "Penguin 🐧": "Air", 
    "Lion 🦁": "Fire",
    "Crocheting 🧶": "Earth", 
    "Reading 📖": "Water", 
    "Gaming 🎮": "Fire", 
    "Traveling ✈️": "Air"
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  useEffect(
    function () {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchDogImage();
    }
  }, [currentQuestionIndex]);

  async function fetchDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) {
      throw new Error("Failed to fetch dog image.");
    }
    const data = await response.json();
    setDogImage(data.message);
  }

return (
  <UserProvider value={{ name: userName, setName: setUserName }}>
  <Header />
  <Routes>
    <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
    <Route
      path="/quiz"
      element={currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      ) : (
        <Results element={element} dogImage={dogImage} />
      )}
    />
  </Routes>
</UserProvider>
);
}

export default App

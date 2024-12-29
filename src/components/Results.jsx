/*
This component will display the quiz results 
alongside the image obtained from the API
*/

import { React, useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, dogImage }) {
  const {name} = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {dogImage ? (
        <div className="dog-container">
          <h2>Congratulations!</h2>
          <img src={dogImage} alt="Picture of a dog"></img>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
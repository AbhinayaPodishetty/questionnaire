import React from "react";
import { useNavigate } from "react-router-dom";
import './Instructions.css';
import instructionimg from "../assets/instruction-image.jpg";

const Instructions = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/Audioquestions');
  };

  return (
    <div className="instructions-wrapper">
      <h2 className="instructions-title">Test Instructions</h2>

      <div className="instructions-flexbox">
        
        <ul className="instructions-list">
          <li><i className="fas fa-check-circle icon"></i>Each audio clip can be played only two times per question.</li>
          <li><i className="fas fa-check-circle icon"></i>Please listen to the entire audio clip at least once before answering the question.</li>
          <li><i className="fas fa-check-circle icon"></i>Do not refresh the page so may lead to disqualification.</li>
          <li><i className="fas fa-check-circle icon"></i>Make sure to have proper internet connection.</li>
          <li><i className="fas fa-check-circle icon"></i>The Test consists of 60 mins of time</li>
          <li><i className="fas fa-check-circle icon"></i>Make sure to answer all questions before submitting.</li>
          <li><i className="fas fa-check-circle icon"></i>Once you submit your answers, you cannot go back or make any changes.</li>
        </ul>
        <div className="instructions-image">
          <img src={instructionimg} alt="Instructions visual" />
        </div>
      </div>

      <button onClick={handleStartTest} className="btn-1">Start Test</button>
    </div>
  );
};

export default Instructions;

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Review.css';
const Review = () => {
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("userAnswersWithMeta"));
        if (stored && stored.questions) {
            setAnswers(stored.questions);
        }


    }, []);

    const handleConfirm = () => {
        fetch("http://192.168.1.58/save_response/save_response.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem("userAnswersWithMeta"))?.username || "unknown",
                questions: answers,
            }),

        })
            .then(response => response.json())
            .then(data => {
                console.log("Server response", data);
                navigate('/thank-you');
            })
            .catch(error => {
                console.error("Error submitting answers:", error);
            });

    };

    const handleBack = (index) => {

        sessionStorage.setItem("returningFromReview","true");
       
        sessionStorage.setItem("loadAnswerOnReturn", "true");
        sessionStorage.setItem("currentQuestionIndex", index);
        
        navigate('/Audioquestions');
    }
    return (
        
            <div className="Review-wrapper">
                <h3>Review your Answers</h3>
                <ul className="d-flex gap-2 " style={{ listStyleType: "none" }}>
                    {answers.map((item, index) => (
                        <li
                            key={index}
                            style={{ cursor: "pointer", padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px" }}
                            onClick={() => handleBack(index)}
                        >
                            Q{index + 1}  {item.answer.trim() !== "" ? "✅" : "❌"} </li>

                    ))}
                </ul>
                <div className="d-flex gap-2 justify-content-center">

                    <button className="btn btn-secondary" onClick={handleBack}>
                        Go Back

                    </button>
                    <button className="btn btn-primary" onClick={handleConfirm}>
                        confirm and submit
                    </button>

                </div>

            </div>
        

    )
}
export default Review;
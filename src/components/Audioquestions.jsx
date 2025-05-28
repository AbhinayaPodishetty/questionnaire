import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import audio1 from "../assets/audio-1.wav";
// import audio2 from "../assets/audio-2.wav";
import audio1 from "../assets/test1paragraph.wav";
import audio2 from "../assets/test1question.wav";
import audio3 from "../assets/test2paragraph.wav";
import audio4 from "../assets/test2questions.wav";

import { FaPlay, FaPause } from "react-icons/fa";
import './Audioquestions.css';

const Audioquestions = () => {
  const navigate = useNavigate();
  const [blockUI, setBlockUI] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showDirectSubmit, setShowDirectSubmit] = useState(false);



  const questions = [
    { id: 1, text: "What do you understand about the audio?", audioSrcs: [audio1, audio2] },
    { id: 2, text: "What is your favorite color?", audioSrcs: [audio3, audio4] },
    // { id: 3, text: "Where do you live?", audioSrcs:[audio5,audio1] },
    // { id: 4, text: "Where do you live?", src: audio1 },
    // { id: 5, text: "Where do you live?", src: audio1 },
    // { id: 6, text: "Where do you live?", src: audio1 },
  ];


  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      navigate('/blockedpage');
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {

    const shouldLoad = sessionStorage.getItem("loadAnswerOnReturn");
    const returning = sessionStorage.getItem("returningFromReview") === "true";
    if (returning) {
      setShowDirectSubmit(true);
      sessionStorage.removeItem("returningFromReview");
    }
    if (shouldLoad == "true") {
      const storedData = localStorage.getItem("userAnswersWithMeta");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (parsed && parsed.questions) {
          const loadedAnswers = parsed.questions.map(q => q.answer || "");
          const loadedAudioCounts = parsed.questions.map(q => q.audio_play_count || 0);

          setAnswers(loadedAnswers);
          setAudioCounts(loadedAudioCounts);
          setUsername(parsed.username || "");

          const playedOnceFlags = loadedAnswers.map(ans => ans.trim() !== "");
          setAudioPlayedOnce(playedOnceFlags);

          const index = parseInt(sessionStorage.getItem("currentQuestionIndex"), 10);
          if (!isNaN(index)) {
            setCurrentQuestionIndex(index);
          }
        }
      }
      sessionStorage.removeItem("loadAnswerOnReturn");
      sessionStorage.removeItem("currentquestionIndex");
    }
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitAll();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const isPageReloaded = performance.getEntriesByType("navigation")[0].type === "reload";
    if (isPageReloaded) {
      const refreshCount = sessionStorage.getItem("refreshCount");
      if (!refreshCount) {
        sessionStorage.setItem("refreshCount", "1");
      } else {
        navigate('/blockedpage');
      }
    } else {

      console.log("Page visited normally");
    }

    const savedAnswers = sessionStorage.getItem("answers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));

    }

    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const preventRefresh = (e) => {
      if (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r")) e.preventDefault();
    };
    const preventRightClick = (e) => e.preventDefault();
    const handleVisibilityChange = () => {
      if (document.hidden) navigate("/blockedpage");
    };

    window.addEventListener("keydown", preventRefresh);
    window.addEventListener("contextmenu", preventRightClick);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", preventRefresh);
      window.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate]);


  useEffect(() => {
    const audio = audioRefs.current[currentQuestionIndex]?.current;
    if (audio) {
      setCurrentTimes((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = audio.currentTime || 0;
        return updated;

      });
      setDurations((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = audio.duration || 0;
        return updated;

      })
    }
  }, [currentQuestionIndex]);

  if (blockUI) {
    return (
      <div style={{
        backgroundColor: "#fff", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"

      }} >  You cannot go back.This session is locked;
      </div>
    )
  }

  const [audioCounts, setAudioCounts] = useState(questions.map(q => q.audioSrcs.map(() => 0))
  );
  const [errors, setErrors] = useState(
    questions.map(q => q.audioSrcs.map(() => false))
  );


  const [isPlaying, setIsPlaying] = useState(questions.map(q => q.audioSrcs.map(() => false))
  );
  const [currentTimes, setCurrentTimes] = useState(questions.map(q => q.audioSrcs.map(() => 0))
  );
  const [durations, setDurations] = useState(questions.map(q => q.audioSrcs.map(() => 0))
  );
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);
  const [audioPlayedOnce, setAudioPlayedOnce] = useState(Array(questions.length).fill(false));
  const [username, setUsername] = useState("");
  const audioRefs = useRef(
    questions.map(q => q.audioSrcs.map(() => React.createRef()))
  );



  const handlePlayAudio = (questionIndex, audioIndex) => {
    console.log(`Play clicked: Q${questionIndex} - Audio${audioIndex}`);
    const audio = audioRefs.current[questionIndex][audioIndex].current;

    if (audioIndex === 0 && audioCounts[questionIndex][audioIndex] >= 2) {
      console.log("Play limit reached");
      return;
    }

    // Stop other audios
    audioRefs.current.forEach((qList, qIdx) => {
      qList.forEach((aRef, aIdx) => {
        const a = aRef.current;
        if (a && !a.paused) a.pause();
      });
    });

    audio.play()
      .then(() => {
        console.log("Audio is playing");
      })
      .catch((err) => {
        console.error("Audio play failed:", err);
      });


    // Update count
    if (audioIndex === 1 ) {
      const newCounts = [...audioCounts];
      newCounts[questionIndex] = [...newCounts[questionIndex]]; // deep copy nested array
      newCounts[questionIndex][0]++;
      setAudioCounts(newCounts);


    }

  };


  const handleAudioEnd = (questionIndex, audioIndex) => {
    setAudioCounts(prev => {
      const newCounts = [...prev];
      newCounts[questionIndex][audioIndex]++;
      return newCounts;
    });
    setIsPlaying(prev => {
      const newPlaying = [...prev];
      newPlaying[questionIndex][audioIndex] = false;
      return newPlaying;
    });

  };
  const updateIsPlaying = (questionIndex, audioIndex, isNowPlaying) => {
    setIsPlaying(prev => {
      const updated = prev.map(row => [...row]);
      updated[questionIndex][audioIndex] = isNowPlaying;
      return updated;
    });
  };



  const handleTimeUpdate = (questionIndex, audioIndex) => {
    const audio = audioRefs.current[questionIndex][audioIndex].current;
    if (audio) {
      setCurrentTimes(prev => {
        const newTimes = [...prev];
        newTimes[questionIndex][audioIndex] = audio.currentTime;
        return newTimes;
      });
    }
  };

  const handleLoadedMetadata = (questionIndex, audioIndex) => {
    const audio = audioRefs.current[questionIndex][audioIndex].current;
    if (audio) {
      setDurations(prev => {
        const newDurations = [...prev];
        newDurations[questionIndex][audioIndex] = audio.duration;
        return newDurations;
      });
    }
  };


  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    sessionStorage.setItem("answers", JSON.stringify(newAnswers))
  };

  const handleProgressChange = (e, index) => {
    const audio = audioRefs.current[index].current;
    if (audio) {
      const newTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = newTime;
    }
  };

  const handleSubmitAll = async () => {
    if (submitted) {
      alert("You have already submitted the answers.");
      return;
    }
    // if (!username.trim()) {
    //   alert("Please enter your name before submitting.");
    //   return;
    // }
    if (answers.some((ans) => !ans.trim())) {
      alert("Please fill in all answers before submitting.");
      return;
    }
    const reviewData = {
      username: username.trim(),
      questions: questions.map((q, i) => ({
        question_id: q.id,
        question_text: q.text,
        answer: answers[i],
        audio_play_count: audioCounts[i],
      })),
    };


    localStorage.setItem("userAnswersWithMeta", JSON.stringify(reviewData));
    navigate("/Review");

    setSubmitted(true);
  }


  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const question = questions[currentQuestionIndex];

  return (
    <div className="audioq-wrapper" style={{ display: "flex" }}>
      <div className="audioq-sidebar" style={{ width: "200px", padding: "10px", borderRight: "1px solid black" }}>
        <h5>Questions</h5>
        {questions.map((q, index) => (
          <div
            key={q.id}
            onClick={() => setCurrentQuestionIndex(index)}
            style={{
              padding: "8px",
              marginBottom: "4px",
              cursor: "pointer",
              backgroundColor: index === currentQuestionIndex ? "#007bff" : "#f0f0f0",
              color: index === currentQuestionIndex ? "#fff" : "#000",
              borderRadius: "4px",
              fontWeight: answers[index].trim() ? "bold" : "normal",
            }}
          >
            Q{index + 1} {answers[index].trim() ? "✅" : "⬜"}
          </div>
        ))}
      </div>

      <div className="audioq-container my-5" style={{ flex: 1, padding: "20px" }}>
        <div className="audioq-text">

          <h4 className="audioq-title">Welcome {username}</h4>
          <h4 className="audioq-timer">Time Remaining: {formatTime(timeLeft)}</h4>
        </div>

        <div className="audioq-card mb-4">
          <div className="audioq-card-body">



            {question.audioSrcs.map((src, audioIndex) => (
              <div key={`${question.id}-${audioIndex}`} className="audioq-audio-control d-flex align-items-center mb-3">
                <span className="fw-bold me-3">Audio{audioIndex + 1}</span>
                <button
                  className="audioq-btn-1 me-3"
                  onClick={() => handlePlayAudio(currentQuestionIndex, audioIndex)}
                  disabled={audioCounts[currentQuestionIndex][audioIndex] >= 2}

                >
                  {isPlaying[currentQuestionIndex][audioIndex] ? <FaPause /> : <FaPlay />}
                </button>

                <audio
                  ref={audioRefs.current[currentQuestionIndex][audioIndex]}
                  preload="metadata"
                  onPlay={() => updateIsPlaying(currentQuestionIndex, audioIndex, true)}
                  onPause={() => updateIsPlaying(currentQuestionIndex, audioIndex, false)}
                  onEnded={() => handleAudioEnd(currentQuestionIndex, audioIndex)}
                  onTimeUpdate={() => handleTimeUpdate(currentQuestionIndex, audioIndex)}
                  onLoadedMetadata={() => handleLoadedMetadata(currentQuestionIndex, audioIndex)}
                >

                  <source src={src} type="audio/wav" />

                </audio>
                <input
                  type="range"
                  className="audioq-range"
                  value={
                    durations[currentQuestionIndex][audioIndex] > 0
                      ? (currentTimes[currentQuestionIndex][audioIndex] / durations[currentQuestionIndex][audioIndex]) * 100
                      : 0
                  }
                  onChange={(e) => {
                    const audio = audioRefs.current[currentQuestionIndex][audioIndex].current;
                    if (audio) {
                      const newTime = (e.target.value / 100) * audio.duration;
                      audio.currentTime = newTime;
                    }
                  }}
                  disabled={submitted}
                />

                <span className="small ms-2">
                  {formatTime(currentTimes[currentQuestionIndex][audioIndex])} -{formatTime(currentTimes[currentQuestionIndex][audioIndex])}/
                  {formatTime(durations[currentQuestionIndex][audioIndex])}
                </span>
                {errors[currentQuestionIndex][audioIndex] && (
                  <div className="audioq-alert mt-2 p-2">
                    You can only play this audio 2 times
                  </div>
                )}
              </div>
            ))}

            {(audioCounts[currentQuestionIndex].some(count => count > 0) ?
              (
                <>
                  <p className="mt-3 fw-bold">{question.text}</p>
                  <input
                    type="text"
                    className="audioq-input"
                    value={answers[currentQuestionIndex]}
                    onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}
                    disabled={submitted}
                    placeholder="Type your answer here"
                  />
                </>
              ) :
              <p className="audioq-muted">Listen to an audio to view the question</p>
            )}
          </div>
        </div>

        <div className="d-flex mt-4 gap-2">
          <button
            className="audioq-btn"
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="audioq-btn"
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))
            }
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>

          {(showDirectSubmit || currentQuestionIndex === questions.length - 1) && (
            <button
              className="audioq-submit-btn"
              onClick={handleSubmitAll}
              disabled={submitted}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Audioquestions; 
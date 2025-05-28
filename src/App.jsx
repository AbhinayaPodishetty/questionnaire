import React from "react"
import {BrowserRouter ,Route,Routes} from "react-router-dom";
import Login from "./components/Login";
import Audioquestions from "./components/Audioquestions";
import Thankyou from "./components/Thankyou";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./components/Signup";
import Instructions from "./components/Instructions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Blockedpage from "./components/Blockedpage";
import Review from "./components/Review";


function App(){

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/instructions" element={<Instructions/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/Audioquestions" element={<Audioquestions/>}/>
      
      <Route path="/blockedpage" element={<Blockedpage/>}></Route>
      <Route path="/thank-you" element={<Thankyou/>}/>
      <Route path="/Review" element={<Review/>}></Route>
    </Routes>
    </BrowserRouter>


  );
}

export default App

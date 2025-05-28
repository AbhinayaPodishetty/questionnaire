// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Home.css';
// import sysadmin_03 from "../assets/sysadmin_03.jpg";
// import logo from "../assets/logo.png";

// const Home = () => {
//     return (
//         <div className="home-wrapper">
//                         <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
//                 <div className="custom-navbar-container">
//                     <Link className="navbar-brand d-flex align-items-center" to="/">
//                         <img src={logo} alt="Logo" className="home-logo me-2" />
//                         Online Exam Portal
//                     </Link>

//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarNav"
//                         aria-controls="navbarNav"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>

//                     <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/login">Login</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/signup">Signup</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>


//             <div className="home-content container-fluid px-4 py-5">
//                 <div className="row align-items-center">
//                     <div className="col-md-6 mb-4 mb-md-0">
//                         <img src={sysadmin_03} alt="Banner" className="img-fluid rounded shadow" />
//                     </div>
//                     <div className="col-md-6 text-white">
//                         <h1 className="mb-4">Welcome to the Online Examination System</h1>
//                         <p className="lead">
//                             Prepare, practice, and assess yourself with our online examination platform.
//                             Sign up to get started or log in to continue your test.
//                         </p>
//                         <div className="mt-4">
//                             <Link className="btn btn-success me-3" to="/signup">Get Started</Link>
//                             <Link className="btn btn-outline-light" to="/login">Login</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React from 'react';
import './Home.css';
import backgroundImage from '../assets/sysadmin_03.jpg';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            <header className="top-header">
                <img src={logo} alt="Logo" className="top-logo" />
                <h5 className="header-title">Online Exam Portal</h5>
                <button className='btn-2' >
                    <Link to="/signup" className="link">
                        <p className='link-text'>SignUp</p>
                    </Link>
                </button>


            </header>

            <div
                className="home-background"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="overlay">
                    <div className="text-box">
                        <h2>Welcome to the Online Exam Portal</h2>
                        <p>Prepare. Practice. Perform.</p>
                    </div>

                    <div className="login-box">
                        <h5>🔒 Already Have an Account</h5>
                        <button
                            className="btn btn-primary w-100 mt-3"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login Page
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

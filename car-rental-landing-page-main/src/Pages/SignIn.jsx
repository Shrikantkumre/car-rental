import React, { useState } from 'react';
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import AboutMain from "../images/about/about-main.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import '../styles/style.css';
import { useNavigate } from "react-router-dom";

function SignIn() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth,email, password)
         .then((userCredential) => {
           // Signed in 
           localStorage.setItem('isLoggedIn', true);
           return navigate("/");
         })
         .catch((error) => {
           setError(error.message);
         });
     };

  return (
    <>
      <section className="about-page">
        {/* <HeroPages name="Sign In" /> */}
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src={AboutMain}
              alt="car-renting"
            />
            <div className="about-main__text">
              <h3>Sign In with Email and Password</h3>
              <div className="login-box">
                    <div className='text'>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='text'>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button className='submit-email' onClick={handleSignIn}>Sign In</button>

                    {error && <div className='error'>{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <Footer />
    </>
  );
}

export default SignIn;

import "../LoginComponents/login.css";
import Button from "../LoginComponents/Button";
import Input from "../LoginComponents/Input";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.Context";
import axios from "axios";
import Header from '../HomepageComponents/Header'
import '../HomepageComponents/header.css'
import '../HomepageComponents/search.css'

function Login(props) {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);

    const [userDetails, setUserDetails] = useState({ email: "", password: "" });
    const { email, password } = userDetails;

    async function handleLogIn(event) {
        event.preventDefault();

        try {
            if(!email || !password) {
                alert("All fields are required");
                return;
            }
            const response = await axios.get("http://localhost:5106/api/users", {
                auth: {
                    username: email,
                    password: password
                }
            });

            
            setCurrentUser(userDetails);

            props.loginUser();
            
            navigate("/");
        } catch (error) {
            
            setUserDetails({ email: "", password: "" });
            console.log("Invalid credentials", error.message);
        }
    }

    function handleInputChange(event) {
        const eventName = event.target.name;
        const eventValue = event.target.value;

        setUserDetails((previousDetails) => {
            return {
                ...previousDetails,
                [eventName]: eventValue,
            };
        });
    }

    return (
      <div>
          <div>
              <Header loggedIn={false}/>
          </div>
          <div className="login-parent">
              <div className="login">
                  <Link className="signup-link" to="/signup">
                      Sign up
                  </Link>
                  <div className="loginText">Your Email</div>

                  <Input name="email" type="email" value={email} onChange={handleInputChange} />

                  <div className="loginText">Your Password</div>

                  <Input name="password" type="password" value={password} onChange={handleInputChange} />

                  <Button text="Login" onClick={handleLogIn} />
              </div>
          </div>
      </div>
    );
}

export default Login;

import "../LoginComponents/signup.css";
import Button from "../LoginComponents/Button";
import { useState } from "react";
import SignupInputField from "../LoginComponents/SignupInputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../HomepageComponents/Header";

function SignUp() {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        description: "" 
    });

    const { name, email, password, confirmPassword, role, description } = userDetails;

    async function handleSignUp(event) {

        if(!name, !email, !password, !confirmPassword, !role){
            alert("Please fill all the important fields (*)");
            return;
        }
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5106/api/users", {
                Name: name,
                Email: email,
                PasswordHash: password,
                Role: role, 
                Description: description
            });
            
            navigate("/login");

        } catch (error) {
            
            if (error.response && error.response.status === 409) {
                alert("User already exists.");
                setUserDetails({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                    description: ""
                });
            } else {
                alert("Server error, please try again later");
            }
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
            <div className="signup-parent">
                <h1>Create a DEV@Deakin Account</h1>
                <div className="sign-up">
                    <SignupInputField 
                        fieldHeading='Name*'
                        fieldName='name'
                        fieldType='text'
                        fieldOnchange={handleInputChange}
                        value={userDetails.name}
                    />

                    <SignupInputField 
                        fieldHeading='Email*'
                        fieldName='email'
                        fieldType='email'
                        fieldOnchange={handleInputChange}
                        value={userDetails.email}
                    />
                    
                    <SignupInputField 
                        fieldHeading='Password*'
                        fieldName='password'
                        fieldType='password'
                        fieldOnchange={handleInputChange}
                        value={userDetails.password}
                    />
                    
                    <SignupInputField 
                        fieldHeading='Confirm Password*'
                        fieldName='confirmPassword'
                        fieldType='password'
                        fieldOnchange={handleInputChange}
                        value={userDetails.confirmPassword}
                    />

                    <SignupInputField 
                        fieldHeading='Role*'
                        fieldName='role'
                        fieldType='text'
                        fieldOnchange={handleInputChange}
                        value={userDetails.role}
                    />
                    
                    <SignupInputField 
                        fieldHeading='Description'
                        fieldName='description'
                        fieldType='text'
                        fieldOnchange={handleInputChange}
                        value={userDetails.description}
                    />

                    <Button text="Create" onClick={handleSignUp} />
                </div>
            </div>
        </div>
    );
}

export default SignUp;

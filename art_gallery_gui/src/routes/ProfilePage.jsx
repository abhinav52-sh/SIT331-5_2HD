import { useContext } from "react";
import { UserContext } from "../context/User.Context";
import { useNavigate } from "react-router-dom";
import Header from "../HomepageComponents/Header";
import "../profilepage.css";

function Profile({ setLoggedIn }) {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    // You can perform any necessary cleanup here, such as clearing local storage
    // or logging out from your backend.
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <div>
      <Header loggedIn={currentUser !== null} />
      <div className="profile-page">
        <h1 className="profile-heading">Profile</h1>
        <div className="profile-info">
          <label htmlFor="login-status"> Email: </label>
          {currentUser ? (
            <h1 id="login-status">{currentUser.email}</h1>
          ) : (
            <h1>Not logged in</h1>
          )}
        </div>
        <button type="submit" onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;

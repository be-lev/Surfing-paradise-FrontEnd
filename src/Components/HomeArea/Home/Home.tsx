import { NavLink } from "react-router-dom";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <h1>Welcome to The No1 ranking site for surfing vacations</h1>
      <h3>Come take a tour with us to exotic locations around the world</h3>
      <p>
        <h4>
          You will see places like Tahiti, Sri-lank, Indonesia, Brazil and more,
          we have several types of vacations ranging from <br />
          VIP luxurious to student class economy surfing vacations.
        </h4>
      </p>
      <h1>
        NOW go and book your vacation and search for the wave of your live time{" "}
      </h1>
      <h2>
        Before starting your journey please{" "}
        <NavLink to={"/register"}>Register</NavLink> /{" "}
        <NavLink to={"/login"}>Login</NavLink>{" "}
      </h2>
      <br />
      <br />
      <h3>Already logged in?</h3>

      <h3>
        <NavLink to={"/vacations"}>
          {" "}
          Come here the best waves in the world are waiting for you to ride them
        </NavLink>
      </h3>
    </div>
  );
}

export default Home;

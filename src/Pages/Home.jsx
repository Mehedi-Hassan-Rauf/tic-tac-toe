import { useContext, useEffect } from "react";
import Board from "../Components/Tic-Tac/Board";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);
  const person = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="home ">
      <h1>{person && person.email}</h1>
      <Board />
    </div>
  );
};

export default Home;

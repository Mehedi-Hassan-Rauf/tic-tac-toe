import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import { AuthContextProviderMain } from "./context/AuthContext";
import GameContextProviderMain from "./context/GameContext";

const App = () => {
  return (
    <div className="app bg-slate-900 min-h-screen max-h-fit text-white">
      <AuthContextProviderMain>
        <GameContextProviderMain>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </GameContextProviderMain>
      </AuthContextProviderMain>
    </div>
  );
};

export default App;

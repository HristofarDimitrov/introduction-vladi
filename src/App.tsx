import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Matches } from "./pages/Matches";
import { Nav } from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route path="/matches" element={<Matches />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

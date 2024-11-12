import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import AddBLog from "./pages/add-blog/AddBLog";

function App() {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-blog" element={<AddBLog />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Countries from "./components/Countries";
import { Route, Routes } from "react-router";
import Forms from "./components/Form";
import Country from "./components/Country";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          exact
          path="/countries"
          element={
            <>
              <Navbar />
              <Countries />{" "}
            </>
          }
        />
        <Route
          exact
          path="/activity"
          element={
            <>
              {" "}
              <Navbar />
              <Forms />
            </>
          }
        />
        <Route
          exact
          path="/countries/:id"
          element={
            <>
              {" "}
              <Navbar />
              <Country />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

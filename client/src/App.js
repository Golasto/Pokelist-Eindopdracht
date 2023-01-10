import React, { useState, useEffect } from "react";
import './App.css';
import '../src/components/navbar.css'
import './pages/favorite.css'
import './pages/list-download.css'
import Nav from "../src/components/navbar"
import { Home } from "./pages/home";
import Search from "./pages/search";
import Favorite from "./pages/favorite";
import {ListDownload} from "./pages/list-download";
import { LoginForm } from './components/loginForm'
import { RegisterForm } from "./components/registerForm";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PokemonDetails from "./pages/pokemondetails";

const AUTH_API = "https://frontend-educational-backend.herokuapp.com/"

function App() {
const [currentForm, setCurrentForm] = useState("login");
const [backendData, setBackendData] = useState([{}])
    const [authData, setAuthData] = useState()

    useEffect(() => {
        fetch(AUTH_API + "/api/test/all").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])

const toggleForm = (formName) => {
    setCurrentForm(formName);
}
    const [isAuthenticated, toggleIsAuthenticated ] = useState(false);
  return (
      <>
          <Router>
              <Nav isAuthenticated={ isAuthenticated} toggleIsAuthenticated={ toggleIsAuthenticated}></Nav>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/list-download" element={<ListDownload />} />
                  <Route path="/pokemondetails/:name" element={<PokemonDetails />} />
              </Routes>
          </Router>
          <div className="auth">
              {
                  currentForm === "login" ? <LoginForm onFormSwitch={toggleForm}/> : <RegisterForm onFormSwitch={toggleForm}/>
              }
      </div>
      </>
  );
}

export default App;

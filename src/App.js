import React, { useState } from "react";
import './App.css';
import '../src/components/navbar.css'
import './pages/favorite.css'
import './pages/list-download.css'
import './pages/search.css'
import './pages/home.css'
import './pages/pokemondetails.css'
import Nav from "./components/Navbar"
import { Home } from "./pages/Home";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import {ListDownload} from "./pages/List-Download";
import { LoginForm } from './components/LoginForm'
import { Logoutform } from "./components/LogoutForm";
import { RegisterForm } from "./components/RegisterForm";
import { Navigate, Route, Routes} from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";

const AUTH_API = "https://frontend-educational-backend.herokuapp.com/"

function App() {
const [currentForm, setCurrentForm] = useState("login");

const toggleForm = (formName) => {
    setCurrentForm(formName);
}
    const [isAuthenticated, toggleIsAuthenticated ] = useState(false);
  return (
      <>
              <Nav isAuthenticated={ isAuthenticated} toggleIsAuthenticated={ toggleIsAuthenticated}></Nav>
              <div className="auth">{
                  currentForm === "login" ? <LoginForm onFormSwitch={toggleForm}/> :
                      currentForm === "logout" ? <Logoutform onFormSwitch={toggleForm}/> :
                          <RegisterForm onFormSwitch={toggleForm}/>
              }
          </div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/list-download" element={<ListDownload />} />
                  <Route path="/pokemondetails/:name" element={<PokemonDetails />} />
              </Routes>

      </>
  );
}

export default App;

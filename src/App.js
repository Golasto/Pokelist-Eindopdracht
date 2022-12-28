import React, { useState } from "react";
import './App.css';
import { LoginForm } from './components/loginForm'
import { RegisterForm } from "./components/registerForm";

function App() {
const [currentForm, setCurrentForm] = useState("login");

const toggleForm = (formName) => {
    setCurrentForm(formName);
}

  return (
      <>
          <div className="App">
              {
                  currentForm === "login" ? <LoginForm onFormSwitch={toggleForm}/> : <RegisterForm onFormSwitch={toggleForm}/>
              }
      </div>
      </>
  );
}

export default App;

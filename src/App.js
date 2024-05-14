import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function App() {
  const myKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [variant, setVariant] = useState("info");

  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  function handleClick() {
    async function API() {
      let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${myKey}&q=${city}&aqi=no`
      );
      let data = await response.json();
      setVariant("success");
      setWeather(
        `The current temperature in ${city} is ${
          data.current.temp_c
        }°C and it's currently ${data.current.condition.text.toLowerCase()}.`
      );
    }
    if (city === "") {
      setVariant("danger");
      setWeather("Enter a city name!");
    } else {
      API();
    }
  }

  return (
    <div className="App">
      <h1>Whats the weather now!</h1>
      <Alert variant="info">
        Find Current weather of a city by typing its name below.
      </Alert>

      <input
        type="text"
        value={city}
        placeholder="Enter city here"
        ref={ref}
        onChange={(e) => {
          setCity(e.target.value);
        }}></input>
      <Button onClick={handleClick}>Find weather</Button>
      <Alert variant={variant}>{weather}</Alert>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=7817e68c00a90c5a142287a9f7d664c3")
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  // useEffect(() => {
  //   if(name==="Celar") {
  //     document.body.classList.add("adding");
  //   }
  // },[city]);
  
  function addClass() {
    const a = document.getElementById("elem").classList;
    a.remove("adding_2");
    a.add("adding");
    console.log("Hello")
  };

  function addClass_2 () {
    const a = document.getElementById("elem").classList;
    a.remove("adding");
    a.add("adding_2");
    console.log("Hello 2")
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className="Results" id="elem">
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <p>Wind speed {results.wind.speed} m/s</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
            {
              results.weather[0].main==="Clear" ? addClass() : addClass_2()
            }
          </>}
        </div>
      </div>
    </>
  }
}

export default App;

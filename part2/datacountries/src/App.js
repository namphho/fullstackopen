import axios from "axios";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult";

const api_key = process.env.REACT_APP_API_KEY;
const App = () => {
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState();

  const hookSearchCountries = () => {
    if (keyword) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${keyword}`)
        .then((resp) => {
          setCountries(resp.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const hookGetWeatherInfoByCity = () => {
    if (countries.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${countries[0].capital}`
        )
        .then((resp) => {
          setWeather(resp.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(hookSearchCountries, [keyword]);
  useEffect(hookGetWeatherInfoByCity, [countries]);

  const onShowCountryInfo = (country) => {
    setCountries([country]);
  };

  const search = debounce((text) => {
    setKeyword(text);
  }, 300);

  return (
    <div>
      <form>
        find countries
        <input onChange={(event) => search(event.target.value)}></input>
      </form>
      <SearchResult
        keyword={keyword}
        countries={countries}
        onShowCountryInfo={(country) => onShowCountryInfo(country)}
        weather={weather}
      />
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default App;

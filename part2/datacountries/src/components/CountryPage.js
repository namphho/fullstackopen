import WeatherInfo from "./WeatherInfo.js";

const CountryPage = ({ country, weather }) => {
  return (
    <div>
      <h1> {country.name} </h1>
      <div>capital {country.capital} </div>
      <div>population {country.population} </div>
      <h2> languages </h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.iso639_2}> {language.name}</li>;
        })}
      </ul>
      <img src={country.flag} width="150" height="150" alt="flag" />
      <h2> Weather in {country.capital} </h2>
      <WeatherInfo weather={weather} />
    </div>
  );
};

export default CountryPage;
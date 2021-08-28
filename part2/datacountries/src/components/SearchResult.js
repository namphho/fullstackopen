import CountryPage from "./CountryPage";

const SearchResult = ({ keyword, countries, onShowCountryInfo, weather }) => {
  if (keyword === "") {
    return <></>;
  }
  const length = countries.length;
  if (length <= 10 && length > 1) {
    return (
      <>
        {countries.map((country) => {
          return (
            <div key={country.alpha3Code}>
              {`${country.name}  `}
              <button onClick={() => onShowCountryInfo(country)}>show</button>
            </div>
          );
        })}
      </>
    );
  } else if (length === 1) {
    return (
      <>
        <CountryPage country={countries[0]} weather={weather} />
      </>
    );
  } else if (length > 10) {
    return <>Too many matches, specify another filter</>;
  } else {
    return <></>;
  }
};

export default SearchResult;

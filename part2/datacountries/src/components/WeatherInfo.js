const WeatherInfo = ({ weather }) => {
  if (weather) {
    return (
      <>
        <div>
          <b>temperature:</b> {weather.current.temperature} Celcius
        </div>
        <img
          src={weather.current.weather_icons[0]}
          height="64"
          width="64"
          alt="weather icon"
        />
        <div>
          <b>wind:</b> {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </div>
      </>
    );
  }
  return <></>;
};

export default WeatherInfo;

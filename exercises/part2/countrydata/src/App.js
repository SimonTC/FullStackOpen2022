import {useEffect, useState} from "react";
import axios from "axios";

const getCountryName = (country) => country.name.common

const TooManyCountries = () => <p>Too many matches, specify another filter</p>

const SingleCountryBaseInfo = ({country, onCountrySelected}) => {
  return(
    <li>
      {getCountryName(country)}
      <button onClick={() => onCountrySelected(country)}>show</button>
    </li>
  )
}

const CountryList = ({countries, onCountrySelected}) => {
  return (
    <ul>
      {countries.map(country =>
        <SingleCountryBaseInfo key={getCountryName(country)} country={country} onCountrySelected={onCountrySelected}/>
      )}
    </ul>
  )
}

const WeatherInfo = ({weather}) => {
  if (!weather){
    return <p></p>
  }

  return (
    <>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <p>Wind {weather.wind.speed} m/s</p>
    </>
  )

}

const CountryDetail = ({country, weatherInCountry}) => {
  return(
    <>
      <h1>{getCountryName(country)}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <b>Languages</b>
      <ul>
        {Object.entries(country.languages).map(([_, language]) =>
          <li key={language}>
            {language}
          </li>)}
      </ul>
      <h1>{country.flag}</h1>
      <h2>Weather in {country.capital[0]}</h2>
      <WeatherInfo weather={weatherInCountry}/>
    </>
  )
}

const CountryListing = ({countries, selectedCountry, onCountrySelected, weatherInSelectedCountry}) => {
  if (countries.length > 10){
    return <TooManyCountries/>
  }

  if (countries.length === 1){
    if(countries[0] !== selectedCountry){
      onCountrySelected(countries[0])
    }
    return <CountryDetail country={countries[0]} weatherInCountry={weatherInSelectedCountry}/>
  }

  const showDetailOfSelectedCountry = () => {
    if (selectedCountry){
      return <CountryDetail country={selectedCountry} weatherInCountry={weatherInSelectedCountry}/>
    }
  }

  return (
    <>
      <CountryList countries={countries} onCountrySelected={onCountrySelected}/>
      {showDetailOfSelectedCountry()}
    </>
  )
}

const CountryFilter = (props) => {
  return <p>Find countries <input value={props.value} onChange={props.onChange}/></p>;
}

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [weatherInSelectedCountry, setWeatherInSelectedCountry] = useState(undefined);

  const getAllCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setAllCountries(response.data))
  }

  const getWeatherForCountry = (country) => {
    if (!country){
      return
    }

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY

    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`)
      .then(response => setWeatherInSelectedCountry(response.data))
  }

  useEffect(getAllCountries, []);

  useEffect(() => getWeatherForCountry(selectedCountry), [selectedCountry])

  const onFilterUpdated = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(undefined)
    setWeatherInSelectedCountry(undefined)
  }

  const onCountrySelected = (country) => {
    if (country !== selectedCountry){
      setSelectedCountry(country)
      setWeatherInSelectedCountry(undefined)
    }
  }

  const countriesToShow = allCountries.filter(country =>
    getCountryName(country).toLowerCase().startsWith(countryFilter.toLowerCase()))

  return(
    <div>
      <CountryFilter value={countryFilter} onChange={onFilterUpdated}/>
      <CountryListing
        countries={countriesToShow}
        onCountrySelected={onCountrySelected}
        selectedCountry={selectedCountry}
        weatherInSelectedCountry={weatherInSelectedCountry}
      />
    </div>
  )

}

export default App;

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

const CountryDetail = ({country}) => {
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
    </>
  )
}

const CountryListing = ({countries, selectedCountry, onCountrySelected}) => {
  if (countries.length > 10){
    return <TooManyCountries/>
  }

  if (countries.length === 1){
    return <CountryDetail country={countries[0]}/>
  }

  const showDetailOfSelectedCountry = () => {
    if (selectedCountry){
      return <CountryDetail country={selectedCountry}/>
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

  const getAllCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setAllCountries(response.data))
  }

  useEffect(getAllCountries, []);

  const onFilterUpdated = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(undefined)
  }

  const onCountrySelected = (country) => {
    setSelectedCountry(country)
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
      />
    </div>
  )

}

export default App;

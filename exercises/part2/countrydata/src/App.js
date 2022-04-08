import {useEffect, useState} from "react";
import axios from "axios";

const getCountryName = (country) => country.name.common

const TooManyCountries = () => <p>Too many matches, specify another filter</p>

const CountryList = ({countries}) => {
  return (
    <ul>
      {countries.map(getCountryName).map(name => <li key={name}>{name}</li>)}
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
        {Object.entries(country.languages).map(([_, language]) => <li>{language}</li>)}
      </ul>


      {country.flag}
    </>
  )
}

const CountryListing = ({countries}) => {
  if (countries.length > 10){
    return <TooManyCountries/>
  }

  if (countries.length === 1){
    return <CountryDetail country={countries[0]}/>
  }

  return <CountryList countries={countries}/>
}

const CountryFilter = (props) => {
  return <p>Find countries <input value={props.value} onChange={props.onChange}/></p>;
}

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  const getAllCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setAllCountries(response.data))
  }

  useEffect(getAllCountries, []);

  const onFilterUpdated = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = allCountries.filter(country =>
    getCountryName(country).toLowerCase().startsWith(countryFilter.toLowerCase()))

  return(
    <div>
      <CountryFilter value={countryFilter} onChange={onFilterUpdated}/>
      <CountryListing countries={countriesToShow}/>
    </div>
  )

}

export default App;

import React, { useEffect, useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchMenu from './SearchMenu';
import CountryCard from './CountryCard';

const CountryList = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setIsDark(!isDark);
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  useEffect(() => {
    let result = allCountries;

    if (searchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion);
    }

    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, allCountries]);

  return (
    <>
      <Header toggleTheme={toggleTheme} isDark={isDark} />
      <main>
        <div className="search-filter-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SearchMenu selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        </div>
        <div className="countries-container">
          {filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CountryList;

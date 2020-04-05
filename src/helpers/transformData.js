import * as countryCodes from '../data/countryToISO.json';

export const getLatestGlobalData = (data) => {
  let date;
  let confirmed = 0;
  let deaths = 0;
  let recovered = 0;
  let keys = Object.keys(data);
  for (let country of keys) {
    const latest = data[country][data[country].length-1];
    date = latest.date;
    confirmed = confirmed + latest.confirmed;
    deaths = deaths + latest.deaths;
    recovered = recovered + latest.recovered;
  }
  const ncountries = keys.length;
  return {date, confirmed, deaths, recovered, ncountries};
}

export const getLatestCountrywiseData = (data) => {
  let keys = Object.keys(data);
  const latestCountrywiseData = [];
  for (let country of keys) {
    const latest = data[country][data[country].length-1];
    const date = latest.date;
    const confirmed = latest.confirmed;
    const deaths = latest.deaths;
    const recovered = latest.recovered;
    const active = confirmed - deaths - recovered;
    const id = countryCodes.default[country];
    latestCountrywiseData.push({date, country, confirmed, deaths, recovered, active, id});
  }
  return latestCountrywiseData;
}
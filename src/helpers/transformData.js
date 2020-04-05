import * as countryCodes from '../data/countryToISO.json';

export const getLatestGlobalData = (data) => {
  let date;
  let confirmed = 0;
  let deaths = 0;
  let recovered = 0;
  let active = 0;
  let keys = Object.keys(data);
  for (let country of keys) {
    const latest = data[country][data[country].length-1];
    date = latest.date;
    confirmed = confirmed + latest.confirmed;
    deaths = deaths + latest.deaths;
    recovered = recovered + latest.recovered;
    active = active + latest.confirmed - latest.deaths - latest.recovered;
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

export const getCountryIndex = (data) => {
  let keys = Object.keys(data);
  const countries = {};
  let i = 0;
  for (let country of keys) {
    countries[country.toLowerCase()] = i;
    i++
  }
  return countries;
}

export const getGlobalCovidTimeSeries = (data) => {
  const globalTimeSeries = [];
  let keys = Object.keys(data);
  const n = data[keys[0]].length;
  for(let i=0; i<n; i++) {
    const date = data[keys[0]][i].date
    let confirmed = 0;
    let deaths = 0;
    let recovered = 0;
    let active = 0;
    for(let country of keys) {
      const current = data[country][i];
      confirmed = confirmed + current.confirmed;
      deaths = deaths + current.deaths;
      recovered = recovered + current.recovered;
      active = active + current.confirmed - current.deaths - current.recovered;
    }
    globalTimeSeries.push({date, confirmed, deaths, recovered, active});
  }
  return globalTimeSeries;
}

export const getGlobalCovidDailyDelta = (globalTImeSeriesData) => {
  const dailyDelta = [];
  for(let i=1; i<globalTImeSeriesData.length; i++) {
    const date = globalTImeSeriesData[i].date;
    const confirmed = globalTImeSeriesData[i].confirmed - globalTImeSeriesData[i-1].confirmed;
    const deaths = globalTImeSeriesData[i].deaths - globalTImeSeriesData[i-1].deaths;
    const recovered = globalTImeSeriesData[i].recovered - globalTImeSeriesData[i-1].recovered;
    const active = globalTImeSeriesData[i].active - globalTImeSeriesData[i-1].active;
    dailyDelta.push({date, confirmed, deaths, recovered, active});
  }
  return dailyDelta;
}
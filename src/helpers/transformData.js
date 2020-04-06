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
    const active = Math.max(globalTImeSeriesData[i].active - globalTImeSeriesData[i-1].active, 0);
    dailyDelta.push({date, confirmed, deaths, recovered, active});
  }
  return dailyDelta;
}

export const getCountrywiseCovidTimeSeries = (data) => {
  const countrywiseTimeSeries = [];
  let keys = Object.keys(data);
  for(let country of keys) {
    countrywiseTimeSeries.push({country, data: data[country]});
  }
  for(let i=0; i<countrywiseTimeSeries.length; i++) {
    for(let j=0; j<countrywiseTimeSeries[i].data.length; j++) {
      const point = countrywiseTimeSeries[i].data[j];
      const active = point.confirmed - point.deaths - point.recovered;
      point.active = active;
    }
  }
  return countrywiseTimeSeries;
}

export const getCountrywiseCovidDailyDelta = (countrywiseTimeSeriesData) => {
  const countrywiseDailyDelta = [];
  for(let i=0; i<countrywiseTimeSeriesData.length; i++) {
    const dailyDelta = [];
    const data = countrywiseTimeSeriesData[i].data;
    for(let j=1; j<data.length; j++) {
      const date = data[j].date;
      const confirmed = data[j].confirmed - data[j-1].confirmed;
      const deaths = data[j].deaths - data[j-1].deaths;
      const recovered = data[j].recovered - data[j-1].recovered;
      const active = Math.max(data[j].active - data[j-1].active, 0);
      dailyDelta.push({date, confirmed, deaths, recovered, active});
    }
    countrywiseDailyDelta.push({country: countrywiseTimeSeriesData[i].country, data: dailyDelta});
  }
  return countrywiseDailyDelta;
}
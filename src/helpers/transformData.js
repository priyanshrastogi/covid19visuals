import countryInfo from '../data/countries';

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
  return {date, confirmed, deaths, recovered, active, ncountries};
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
    const id = countryInfo[country] ? countryInfo[country].alpha3 : null;
    const code = countryInfo[country] ? countryInfo[country].alpha2 : null;
    const flag = countryInfo[country] ? countryInfo[country].flag : null;
    if(id === null) {
      console.log('Missing Country: '+country);
    }
    let infPopRatio, deathsPopRatio;
    if(countryInfo[country] && countryInfo[country].population) {
      infPopRatio = (confirmed/countryInfo[country].population)*1000000;
      if(infPopRatio<1) {
        infPopRatio = infPopRatio.toFixed(1);
      }
      else {
        infPopRatio = Math.round(infPopRatio);
      }
      deathsPopRatio = (deaths/countryInfo[country].population)*1000000;
      if(deathsPopRatio<1) {
        deathsPopRatio = deathsPopRatio.toFixed(1);
      }
      else {
        deathsPopRatio = Math.round(deathsPopRatio);
      }
    }
    else {
      infPopRatio = NaN;
      deathsPopRatio = NaN;
    }
    latestCountrywiseData.push({date, country, confirmed, deaths, recovered, active, id, infPopRatio, deathsPopRatio, flag, code});
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
    const confirmed = Math.max(globalTImeSeriesData[i].confirmed - globalTImeSeriesData[i-1].confirmed, 0);
    const deaths = Math.max(globalTImeSeriesData[i].deaths - globalTImeSeriesData[i-1].deaths, 0);
    const recovered = Math.max(globalTImeSeriesData[i].recovered - globalTImeSeriesData[i-1].recovered, 0);
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
      const confirmed = Math.max(data[j].confirmed - data[j-1].confirmed, 0);
      const deaths = Math.max(data[j].deaths - data[j-1].deaths, 0);
      const recovered = Math.max(data[j].recovered - data[j-1].recovered, 0);
      const active = Math.max(data[j].active - data[j-1].active, 0);
      dailyDelta.push({date, confirmed, deaths, recovered, active});
    }
    countrywiseDailyDelta.push({country: countrywiseTimeSeriesData[i].country, data: dailyDelta});
  }
  return countrywiseDailyDelta;
}

export const getIndiaData = (data) => {
  const result = {};
  const indiaTimeSeries = [];
  const indiaTimeSeriesDelta = [];
  const monthRef = {January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7};
  const timeseries = data.cases_time_series;
  for(let i=0; i<timeseries.length; i++) {
    const confirmed = parseInt(timeseries[i].totalconfirmed);
    const recovered = parseInt(timeseries[i].totalrecovered);
    const deaths = parseInt(timeseries[i].totaldeceased);
    const active = confirmed - recovered - deaths;
    const confirmedDelta = parseInt(timeseries[i].dailyconfirmed);
    const recoveredDelta = parseInt(timeseries[i].dailyrecovered);
    const deathsDelta = parseInt(timeseries[i].dailydeceased);
    const activeDelta = Math.max(confirmedDelta - recoveredDelta - deathsDelta, 0);
    const dateSplit = timeseries[i].date.split(' ');
    const date = `2020-${monthRef[dateSplit[1]]}-${parseInt(dateSplit[0])}`
    indiaTimeSeries.push({date, confirmed, recovered, deaths, active});
    indiaTimeSeriesDelta.push({date, confirmed: confirmedDelta, recovered: recoveredDelta, deaths: deathsDelta, active: activeDelta});
  }
  result.timeseries = indiaTimeSeries;
  result.timeseriesDelta = indiaTimeSeriesDelta;
  result.statewise = data.statewise;
  return result;  
}
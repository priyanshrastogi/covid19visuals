const findHighestCDRDelta = (timeseriesDeltaData) => {
  let maxC=0, maxD=0, maxR=0, cIndex=0, dIndex=0, rIndex=0;
  for(let i=0; i<timeseriesDeltaData.length; i++) {
    if(timeseriesDeltaData[i].confirmed > maxC) {
      maxC = timeseriesDeltaData[i].confirmed;
      cIndex = i;
    }
    if(timeseriesDeltaData[i].deaths > maxD) {
      maxD = timeseriesDeltaData[i].deaths;
      dIndex = i;
    }
    if(timeseriesDeltaData[i].recovered > maxR) {
      maxR = timeseriesDeltaData[i].recovered;
      rIndex = i;
    }
  }
  return [cIndex, dIndex, rIndex];
}

const findMinMaxCurveSlope = (timeseriesData, x, type) => {
  let minSlope = Number.MAX_VALUE;
  let maxSlope = Number.MIN_VALUE;
  const slopes = [];
  let maxSlopeIndex = 0, minSlopeIndex = 0;
  for(let i=x; i<timeseriesData.length; i++) {
    const startDate = timeseriesData[i-x].date;
    const endDate = timeseriesData[i].date;
    const slope = Math.round((timeseriesData[i][type]-timeseriesData[i-x][type])/(x));
    const total = timeseriesData[i][type]-timeseriesData[i-x][type];
    slopes.push({startDate, endDate, slope, total});
    if(slope > maxSlope) {
      maxSlope = slope;
      maxSlopeIndex = i-x;
    }
    if(slope < minSlope) {
      minSlope = slope;
      minSlopeIndex = i-x;
    }
  }
  return {min: slopes[minSlopeIndex], max: slopes[maxSlopeIndex]};
}

const findRatesAndRatio = (timeseriesData, days, type) => {
  const result = {};
  const numDaysInf = timeseriesData[timeseriesData.length-1-days][type];
  const curInf = timeseriesData[timeseriesData.length-1][type];
  result.ratio = (curInf/numDaysInf).toFixed(2);
  result.rate = Math.round((curInf-numDaysInf)/days);
  return result;
}

export const findFacts = (timeseriesData, timeseriesDeltaData) => {
  const facts = {};
  const [ci, di, ri] = findHighestCDRDelta(timeseriesDeltaData);
  facts.highestConfirmed = timeseriesDeltaData[ci];
  facts.highestDeaths = timeseriesDeltaData[di];
  facts.minMaxConfirmedSlope = {7: findMinMaxCurveSlope(timeseriesData, 7, 'confirmed'), 15: findMinMaxCurveSlope(timeseriesData, 15, 'confirmed'), 30: findMinMaxCurveSlope(timeseriesData, 30, 'confirmed')};
  facts.minMaxDeathsSlope = {7: findMinMaxCurveSlope(timeseriesData, 7, 'deaths'), 15: findMinMaxCurveSlope(timeseriesData, 15, 'deaths'), 30: findMinMaxCurveSlope(timeseriesData, 30, 'deaths')};
  facts.ratioRateConfirmed = {7: findRatesAndRatio(timeseriesData, 7, 'confirmed'), 15: findRatesAndRatio(timeseriesData, 15, 'confirmed'), 30: findRatesAndRatio(timeseriesData, 30, 'confirmed')};
  facts.ratioRateDeaths = {7: findRatesAndRatio(timeseriesData, 7, 'deaths'), 15: findRatesAndRatio(timeseriesData, 15, 'deaths'), 30: findRatesAndRatio(timeseriesData, 30, 'deaths')};
  facts.latestActive = {7: findRatesAndRatio(timeseriesData, 7, 'active')};
  return facts;
}

export const findCountrywiseFacts = (timeseriesData, timeseriesDeltaData) => {
  const facts = {};
  for(let i=0; i<timeseriesData.length; i++) {
    facts[timeseriesData[i].country.toLowerCase()] = findFacts(timeseriesData[i].data, timeseriesDeltaData[i].data);
  }
  return facts;
}

export const findFlatCurveCountries = (timeseriesData) => {
  const countries = [];
  for(let i=0; i<timeseriesData.length; i++) {
    const active = findRatesAndRatio(timeseriesData[i].data, 7, 'active').rate;
    if(active<0) {
      const latest = timeseriesData[i].data[timeseriesData[i].data.length-1];
      countries.push({country: timeseriesData[i].country, slope: active, confirmed: latest.confirmed, active: latest.active});
    }
  }
  return countries;
}

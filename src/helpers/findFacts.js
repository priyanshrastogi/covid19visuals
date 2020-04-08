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

const findMinMaxCurveSlope = (timeseriesData, x) => {
  let minSlope = Number.MAX_VALUE;
  let maxSlope = Number.MIN_VALUE;
  const slopes = [];
  let maxSlopeIndex = 0, minSlopeIndex = 0;
  for(let i=x-1; i<timeseriesData.length; i++) {
    const startDate = timeseriesData[i-x+1].date;
    const endDate = timeseriesData[i].date;
    const slope = (timeseriesData[i].confirmed-timeseriesData[i-x+1].confirmed)/(x-1);
    slopes.push({startDate, endDate, slope});
    if(slope > maxSlope) {
      maxSlope = slope;
      maxSlopeIndex = i-x+1;
    }
    if(slope < minSlope) {
      minSlope = slope;
      minSlopeIndex = i-x+1;
    }
  }
  return {min: slopes[minSlopeIndex], max: slopes[maxSlopeIndex]};
}

export const findGlobalFacts = (timeseriesData, timeseriesDeltaData) => {
  const facts = {};
  const [ci, di, ri] = findHighestCDRDelta(timeseriesDeltaData);
  facts.highestConfirmed = timeseriesDeltaData[ci];
  facts.highestDeaths = timeseriesDeltaData[di];
  facts.minMaxDeltaSlope = findMinMaxCurveSlope(timeseriesDeltaData, 7);
  return facts;
}
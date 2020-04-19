import countryInfo from './countries';

const countries = Object.keys(countryInfo).sort();

const codeToName = {};

for(let c of countries) {
  const alpha2 = countryInfo[c].alpha2;
  if(alpha2)
    codeToName[alpha2.toLowerCase()] = c;
}

export default codeToName;
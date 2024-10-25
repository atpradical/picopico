export type ResponseGetCountries = {
  geonames: CountryData[]
}
export type CountryData = {
  areaInSqKm: string
  capital: string
  continent: string
  continentName: string
  countryCode: string
  countryName: string
  currencyCode: string
  east: number
  fipsCode: string
  geonameId: number
  isoAlpha3: string
  isoNumeric: string
  languages: string
  north: number
  population: string
  postalCodeFormat: string
  south: number
  west: number
}

export type GetCountriesArgs = {
  locale: string
}

export type GetCitiesArgs = {
  countryName: string
  locale: string
  minPopulation: number
}

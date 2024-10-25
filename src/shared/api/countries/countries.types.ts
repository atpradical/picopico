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

export type ResponseGetCities = {
  geonames: CityData[]
  totalResultsCount: number
}
export type AdminCodes1 = {
  ISO3166_2: string
}
export type CityData = {
  adminCode1: string
  adminCodes1: AdminCodes1
  adminName1: string
  countryCode: string
  countryId: string
  countryName: string
  fcl: string
  fclName: string
  fcode: string
  fcodeName: string
  geonameId: number
  lat: string
  lng: string
  name: string
  population: number
  toponymName: string
}

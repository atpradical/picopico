import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { countryName, lang, minPopulation } = req.query
    const apiUrl = `${process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL}searchJSON?country=${countryName}&lang=${lang}&featureClass=P&minPopulation=${minPopulation}&username=${process.env.NEXT_PUBLIC_COUNTRIES_USERNAME}`
    const response = await axios.get(apiUrl)

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' })
  }
}

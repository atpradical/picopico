import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { lang } = req.query
    const apiUrl = `${process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL}countryInfoJSON?lang=${lang}&username=${process.env.NEXT_PUBLIC_COUNTRIES_USERNAME}`
    const response = await axios.get(apiUrl)

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' })
  }
}

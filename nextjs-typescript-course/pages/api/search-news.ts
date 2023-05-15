import { NewsResponse } from '@/models/NewsArticles'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // whenever the user clicks the search button, a http request will be sent to the backend api, which is what this is
  // the url endpoint for this http request would be /api/search-news?q=search
  // there needs to be /api because it's in the api folder, there needs to be search-news because that's the name of this file, and a query param will be used for whatever the user typed into the search bar, so in this case he typed in search
  const searchQuery = req.query.q?.toString()

  // for server-side validation, check if query is undefined
  if(!searchQuery) return res.status(400).json({ error: "Please provide a search query"})

  // if we reach this line of code, no errors in the request, in that case let's work on sending back the response
  // here we get the response object back from the news api
  const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`)

  // here we are converting the response to JSON but also defining a typed variable for the data we want from the news api
  const newsResponse: NewsResponse = await response.json()

  res.status(200).json(newsResponse.articles)
}

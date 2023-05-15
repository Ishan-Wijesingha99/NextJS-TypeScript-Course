// on the search page, we actually want client side rendering because only once the user clicks the search button should the data from the server/api be returned
// therefore search engine crawlers won't check search results for SEO

import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticle } from "@/models/NewsArticles"
import { FormEvent, useState } from "react"
import { Form, Button, Spinner } from 'react-bootstrap'
import Head from "next/head"



export default function SearchNewsPage() {
  // in order to tell typescript what type this state variable searchResults must be, we do the following...
  // this means, searchResults can be either an array of NewsArticle types or null
  // you could add as many vertical bars for as many 'ors' as possible <NewsArticle[] | null | true | undefined>
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null)
  
  // if the state variable is of the boolean type, typescript understands this and you don't need to do anything further
  const [searchResultsLoading, setSearchResultsLoading] = useState(false)
  const [searchResultsError, setSearchResultsError] = useState(false)

  // this is how you define the type for the event
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // the following code just extracts the search query the user typed in
    const formData = new FormData(event.target as HTMLFormElement)

    // this is the search query
    const searchQuery = formData.get("searchQuery")?.toString().trim()

    // check if search query exists, if so, then run the search
    if(searchQuery) {
      try {
        // set states back to initial states
        setSearchResults(null)
        setSearchResultsError(false)

        // set loading to true
        setSearchResultsLoading(true)

        // get response from backend api folder
        const response = await fetch("/api/search-news?q=" + searchQuery)

        // define typed variable articles which is an array of NewsArticle types
        const articles: NewsArticle[] = await response.json()

        // set state to that array of NewsArticle objects
        setSearchResults(articles)

      } catch (error) {
        console.log(error)
        // display error in component by changing this state
        setSearchResultsError(true)
      } finally {
        setSearchResultsLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">Search News</title>
      </Head>

      <main>
        <h1>Search News</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search Query</Form.Label>

            <Form.Control
            name="searchQuery"
            placeholder="Example - politics, sports, weather..."
            />
          </Form.Group>

          <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
            Search
          </Button>
        </Form>

        <div className="d-flex flex-column align-items-center">

          {searchResultsLoading && <Spinner animation="border"/>}

          {searchResultsError && <p>Something went wrong. Please try again.</p>}

          {searchResults?.length === 0 && <p>Nothing found. Try a different search query.</p>}

          {searchResults && <NewsArticlesGrid articles={searchResults}/>}

        </div>
      </main>
    </>
  )
}

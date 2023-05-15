import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import Head from 'next/head'
import { Alert } from 'react-bootstrap'

// this is a typescript type from nextJS that is built-in
import { GetServerSideProps } from 'next'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'



// this is how you define props for a functional component in typescript
// if you had 3 props you wanted to access, you would set up an interface like this, and then add types for each prop
interface BreakingNewsPageProps {
  // add one of these for each prop
  newsArticles: NewsArticle[]
}


// this will fetch the data from the api, which mimicks fetching data from our backend (which is also an API most of the time)
// we usually do api/backend calls in useEffect() but in NextJS we use getServerSideProps
// this won't be executed on the client, it will be executed on the server
// getServerSideProps only works in pages folder
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  // we get back the api response
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY)

  // we then set that api response to the NewsResponse type we defined
  // in typescript we can define a variable with a type like below or without a type like above
  const newsResponse: NewsResponse = await response.json()

  // when using getServerSideProps, you always need to return an object with a props property
  // we're just returning the api data we want, which is the articles array of objects
  return {
    props: { newsArticles: newsResponse.articles }
  }
}




// what you're doing here is, whenever this component is rendered, you have access to the props returned by the BreakingNewsPageProps function, this function asynchronously fetches the data from the api, and you have access to that data in the component
// this is how you fetch data using nextJS with typescript
export default function BreakingNewsPage({ newsArticles }: BreakingNewsPageProps) {

  return (
    <>
      <Head>
        <title>Breaking News</title>
      </Head>

      <main>
        <h1>Breaking News</h1>

        <Alert>
          This page uses getServerSideProps to fetch data on the server and display it to search engine crawlers before the page is loaded on the client. This improves SEO.
        </Alert>

        {/* this will invoke the BreakingNewsPageProps function to render newsArticles */}
        <NewsArticlesGrid articles={newsArticles}/>
      </main>
    </>
  )
}

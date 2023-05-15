import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import Head from 'next/head'

// this is a typescript type from nextJS that is built-in
import { GetServerSideProps } from 'next'



// this is how you define props for a functional component in typescript
// if you had 3 props you wanted to access, you would set up an interface like this, and then add types for each prop
interface BreakingNewsPageProps {
  // add one of these for each prop
  newsArticles: NewsArticle[]
}


// this will fetch the data from the api, which mimicks fetching data from our backend (which is also an API most of the time)
// we usually do api/backend calls in useEffect() but in NextJS we use getServerSideProps
// this won't be executed on the client, it will be executed on the server
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



// you then write the interface name like this and destructure the props you want
export default function BreakingNewsPage({ newsArticles }: BreakingNewsPageProps) {

  return (
    <>
      <Head>
        <title>Breaking News</title>
      </Head>

      <main>
        <h1>Breaking News</h1>
      </main>
    </>
  )
}

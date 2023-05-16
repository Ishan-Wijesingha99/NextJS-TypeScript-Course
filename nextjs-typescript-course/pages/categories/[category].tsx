import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticle, NewsResponse } from "@/models/NewsArticles"

// this is the built-in type we get from nextJS
import { GetStaticPaths, GetStaticProps } from "next"

// you need to define an interface for all props you're going to use in this functional component
interface CategoryNewsPageProps {
  newsArticles: NewsArticle[]
}

// there is a problem, these pages will fetch data from the api at compile time, but here is the thing, the category names are dynamic and the user goes to different categories way after compile time. So for instance, NextJS has no idea '/categories/sport' will be executed at compile time
// solve this by using getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

  const paths = categorySlugs.map(slug => (
    {
      params: { category: slug}
    }
  ))

  return {
    paths,
    fallback: false
  }
}


// for this page, we don't want to load the content from the api when we open the page (for that we would use getServerSideProps), we want to load the content from the api at compile time.
// if we load the data from the api at compile time, it will load very fast when we click on the page from the browser search results because it's already loaded. NextJS will create static HTML web pages for the pages that are loaded are compile time.
export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async context => {
  
  // if the user clicks on the sport category button, we want the news articles for sport to be fetched, if the user clicks on the health category button, we want the news articles for the health to be fetched
  // our current url is '/categories', when the sport category button is clicked, the url will change to '/categories/sport', to grab that sport route param, we can use context.params?.category?.toString()
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${context.params?.category?.toString()}&apiKey=${process.env.NEWS_API_KEY}`)

  // just converting the response to JSON and also storing it as a typed variable
  const newsResponse: NewsResponse = await response.json()

  // returning the articles from newsResponse object in this new object that has props as property
  return {
    props: { newsArticles: newsResponse.articles },
    // because this page contains data from the news api and it is all fetched at compile time, we can add a revalidate time in seconds, this just means that if we reload the page or go to another page and come back, we'll see the same data that was fetched from the api because it was loaded at compile time, it's static not dynamic.
    // The revalidate property allows you to reload the data every so often, so here every 5 minutes it's reloaded and the data from the news api is refetched
    revalidate: 5 * 60
  }
}


export default function CategoryNewsPage({ newsArticles }: CategoryNewsPageProps) {

  return (
    <>
      <main>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}



// when we fetch data from the news api, we will get back an array of objects, for each of these objects, we will create a typescript interface
export interface NewsArticle {
  author: string,
  title: string, 
  description: string,
  url: string,
  // the ? means that property of the object is optional
  urlToImage?: string,
  publishedAt: string,
  content: string
}

// when we fetch data from the news api, we get back an object which has the array of objects we want as a property, so we need to make an interface for this response object as well
export interface NewsResponse {
  // the article property is an array, so we define it as an array of NewsArticle objects
  articles: NewsArticle[]
}
import { NewsArticle } from "@/models/NewsArticles"
import { Card } from 'react-bootstrap'

// create interface
interface NewsArticleEntryProps {
  article: NewsArticle
}

// take out the article from the interface
export default function NewsArticleEntry({ article }: NewsArticleEntryProps) {

  // sometimes article.urlToImage which is returned from the api is not a valid url, so let's just check that
  const validImageUrl = (article.urlToImage?.startsWith("http://") || article.urlToImage?.startsWith("https://")) ? article.urlToImage : undefined



  return (
    <a href={article.url}>
      <Card className="h-100">
        <Card.Img
        variant="top"
        src={validImageUrl}
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  )
}

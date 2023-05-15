import { NewsArticle } from "@/models/NewsArticles"
import { Row, Col } from "react-bootstrap"
import NewsArticleEntry from "./NewsArticleEntry"



// we always create an interface for the props we access in the functional component
interface NewsArticleGridProps {
  articles: NewsArticle[]
}

export default function NewsArticlesGrid({ articles }: NewsArticleGridProps) {
  return (
    // for extra small screens only show 1 row, for small screens show 2, for extra large screens show 3
    <Row xs={1} sm={2} xl={3} className="g-4">
      {articles.map(articleObject => (
        <Col key={articleObject.url}>
          <NewsArticleEntry article={articleObject}/>
        </Col>
      ))}
    </Row>
  )
}

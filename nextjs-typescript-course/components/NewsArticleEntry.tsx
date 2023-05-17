import { NewsArticle } from "@/models/NewsArticles"
import { Card } from 'react-bootstrap'
import Image from "next/image"
import placeholderImage from "@/assets/images/image-placeholder.jpg"
import styles from '@/styles/NewsArticleEntry.module.css'

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
        <Image
        src={validImageUrl || placeholderImage}
        width={500}
        height={200}
        alt="News article image"
        className={`${styles.image} card-img-top`}
        />

        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  )
}

import React from 'react'
import { Button, Card } from 'react-bootstrap'

const ProductCard = ({product}) => {
  return (
    <Card  className='border'>
      <Card.Img variant="top" src={product.image} height={300} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;

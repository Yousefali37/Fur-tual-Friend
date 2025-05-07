/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import styles from './CSS/Product.module.css';
import { useEffect, useState } from 'react';

export default function Products({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [CardsNo, setCardsNo] = useState(3);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div id="products" className={`${styles['products']}`}>
            <div className="container">
                <h1 className="text-center pb-5">Our Products</h1>
                <div className="row gap-5 text-center align-items-center justify-content-center">
                    {products.slice(0, CardsNo).map(product => (
                        <Card
                            key={product.id}
                            src={require(`../../Assets/Images/${product.img}`)}
                            title={product.title}
                            price={product.price}
                            onAddToCart={onAddToCart}
                            page="product"
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Link to="/products" className={`btn ${styles['show-outline-more']} shadow`}>
                        Show More
                    </Link>
                </div>
            </div>
        </div>
    );
}

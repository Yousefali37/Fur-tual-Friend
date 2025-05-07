import Card from '../Card/Card';
import styles from './CSS/Product.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllProducts({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [cardsNumber, setCardsNumber] = useState(3);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => setError(error.message));
    }, []);

    const showMoreCards = () => {
        if (cardsNumber < products.length) {
            setCardsNumber(cardsNumber + 3);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div id={`${styles['AllProducts']}`}>
            <div className="row fixed-top justify-content-start align-items-center position-relative">
                <button
                    className="go-back-btn col-1 p-1 shadow"
                    onClick={handleGoBack}
                    aria-label="Go back to the previous page"
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
            </div>

            <div className="container mt-4 d-flex flex-column justify-content-center align-items-center pt-5 mt-5">
                <h1 className="text-center pb-5 mt-5">Our Products</h1>

                {error && <p className="text-danger text-center">Error: {error}</p>}

                <div className="row gap-4 text-center justify-content-center align-items-center">
                    {products.length === 0 && !error ? (
                        <p className="text-muted">No products available.</p>
                    ) : (
                        products.slice(0, cardsNumber).map((product) => (
                            <Card
                                key={product.id}
                                src={require(`../../Assets/Images/${product.img}`)}
                                title={product.title}
                                price={product.price}
                                onAddToCart={onAddToCart}
                                page="product"
                            />
                        ))
                    )}
                </div>
                {cardsNumber < products.length && (
                    <div className="d-flex justify-content-center align-items-center m-5">
                        <button
                            className={`btn ${styles['show-outline-more']} shadow`}
                            onClick={showMoreCards}
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

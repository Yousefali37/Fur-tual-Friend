import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import styles from './CSS/Card.module.css';

export default function Card(props) {
    const page = props.page === 'blog';

    // Define animation variants for the card
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } },
    };

    const content = page ? (
        <>
            <Link to={`/AllArticals/${props.id}`} className='card-title text-decoration-none'>
                <h5 className='card-title'>{props.title}</h5>
            </Link>
            <p className="card-text">{props.desc}</p>
            <Link to={`/AllArticals/${props.id}`} className={`btn ${styles['btn-outline-primary']} w-50`}>
                Read More
            </Link>
        </>
    ) : (
        <>
            <h5 className='card-title'>{props.title}</h5>
            <p className="card-text">
                <i className="fa fa-dollar" aria-hidden="true"></i> {props.price}
            </p>
            <button
                onClick={props.onAddToCart}
                className={`addtocart btn ${styles['btn-warning']} w-75`}
                aria-label="Add to cart"
            >
                Add To Cart
            </button>
        </>
    );

    return (
        <motion.div
            className="col-lg-3 col-md-5 col-sm-5"
            initial="hidden"
            whileInView="visible" // Animation triggers when in view
            variants={cardVariants}
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.div className={`${styles['card-scale']} card shadow p-1`} whileHover={{ scale: 1.05 }}>
                <motion.img
                    src={props.src}
                    className="card-img-top"
                    alt={props.alt || props.title || "Image"}
                    variants={imageVariants}
                />
                <motion.div className="card-body" variants={contentVariants}>
                    {content}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

Card.defaultProps = {
    page: 'blog',
    src: '',
    title: 'Untitled',
    price: 'N/A',
    onAddToCart: () => { },
};

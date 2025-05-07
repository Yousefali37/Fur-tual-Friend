import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './CSS/Home.module.css';

export default function Home() {
    const navigate = useNavigate();

    // Animation for the home container and chatbot icon
    const containerVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    const chatbotIconVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }
    };

    return (
        <div id={`${styles['Home']}`}>
            <motion.div
                className={`${styles['home-container']} row d-flex justify-content-between justify-content-md-center align-items-center`}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className={`col-md-6`}>
                    <h1>Welcome to Fur-tual Friend!</h1>
                    <p>
                        At Fur-tual Friend, we’re passionate about helping you provide the best care for your pet.
                        Whether you're searching for expert advice, high-quality products, or just looking to learn
                        more about keeping your furry friend happy and healthy, we’ve got you covered.
                    </p>
                </div>
                <div className={`${styles['home-img']} col-12 col-md-6`}>
                    <img
                        src={require('../../Assets/Images/flat-illustration-people-with-pets.png')}
                        alt="Illustration of people with their pets"
                        className="img-fluid"
                    />
                </div>
            </motion.div>
            
            <motion.div
                className={`${styles['chatbot-icon']} position-fixed rounded-circle`}
                initial="hidden"
                animate="visible"
                variants={chatbotIconVariants}
                drag
                dragConstraints={{ left: 0, right: window.innerWidth - 60, top: 0, bottom: window.innerHeight - 60 }}
            >
                <i
                    className={`fa-solid fa-robot ${styles['inactive']}`}
                    aria-label="Open chatbot"
                    onClick={() => { navigate('/chatbot') }}
                ></i>
            </motion.div>
        </div>
    );
}

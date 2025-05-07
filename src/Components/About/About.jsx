import { motion } from 'framer-motion'; // Import framer-motion
import styles from './CSS/About.module.css';

export default function About() {
    // Define animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <div id="about" className={`${styles['about']} d-flex justify-content-center align-items-center`}>
            <motion.div
                className={`${styles['aboutContainer']} container text-center`}
                initial="hidden"
                whileInView="visible"  // Animation triggers when in view
                variants={containerVariants}
                viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% of the element is in view
            >
                <motion.i
                    className={`${styles['fa-solid']} fa-dog`}
                    initial="hidden"
                    whileInView="visible"  // Animation triggers when in view
                    variants={iconVariants}
                    viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% of the icon is in view
                ></motion.i>
                <h1>Our Story</h1>
                <p>
                    Fur-tual Friend started with a simple vision: to provide the best possible care for pets and their
                    owners. We are a team of pet lovers dedicated to offering high-quality products and services for
                    animals. Since day one, our mission has been to improve the quality of life for your pets through
                    innovative and convenient solutions.
                </p>
            </motion.div>
        </div>
    );
}

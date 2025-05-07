import { useState } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion
import styles from './CSS/ContactUs.module.css';
import Forms from '../Forms/Form';
import contactImage from "../../Assets/Images/Adopt a pet-bro.png";

export default function ContactUs() {
    const [InputValue, SetInputValue] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const [Msg, SetMsg] = useState('');
    const [Loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation checks
        if (!InputValue.name || !InputValue.phone || !InputValue.email || !InputValue.message) {
            SetMsg("Please fill out all fields before submitting.");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(InputValue.email)) {
            SetMsg("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // Success message
        SetMsg("Thank you for reaching out! We'll get back to you soon.");

        // Reset form
        SetInputValue({
            name: "",
            phone: "",
            email: "",
            message: "",
        });
        setLoading(false);
    };

    return (
        <div id={`${styles['contact']}`}>
            <div className="row justify-content-between align-items-center">
                <motion.div 
                    className="d-flex justify-content-center align-items-center mt-4"
                    initial={{ opacity: 0, y: 30 }} // Initial state for fade and slide up
                    animate={{ opacity: 1, y: 0 }}  // Final state
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <h2>Get In Touch</h2>
                </motion.div>

                <motion.div 
                    className={`${styles['contactImg']} col-lg-4 d-flex justify-content-center align-items-center`} 
                    initial={{ opacity: 0, x: 50 }}  // Starting position for image (from the right)
                    animate={{ opacity: 1, x: 0 }}   // End position (default position)
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <img src={contactImage} alt="Contact Us" className="img-fluid" />
                </motion.div>

                <motion.div 
                    className={`${styles['form']} col-lg-5 row justify-content-center align-items-center`} 
                    initial={{ opacity: 0, y: 30 }}  // Initial fade and slide from the bottom
                    animate={{ opacity: 1, y: 0 }}   // Fade and slide to default position
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                    <Forms
                        inputsValues={InputValue}
                        SetInputValues={SetInputValue}
                        handleSubmit={handleSubmit}
                        Msg={Msg}
                        page="contact-us"
                        Loading={Loading}
                    />
                </motion.div>
            </div>
        </div>
    );
}

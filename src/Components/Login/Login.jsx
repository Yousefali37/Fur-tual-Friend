import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';  // Import framer-motion
import styles from './CSS/Login.module.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [formMsg, setFormMsg] = useState('');
    const [isLoading, SetIsLoading] = useState(false);
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!formData.email) {
            setFormMsg("Please enter your email");
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            setFormMsg('Please enter a valid email');
            isValid = false;
        } else if (!formData.password || formData.password.length < 8) {
            setFormMsg("Password must be at least 8 characters");
            isValid = false;
        }

        if (isValid) {
            SetIsLoading(true);
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/users', {
                    email: formData.email,
                    password: formData.password
                });

                if (res.status === 200) {
                    setFormData({ email: '', password: '' });
                    localStorage.setItem('email', formData.email);
                    navigate('/');
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setFormMsg(err.response.data.message);
                } else {
                    setFormMsg("Login failed. Please try again.");
                }
            } finally {
                SetIsLoading(false);
            }
        };
    }

    // Animation variants for the form elements
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div className={styles['login-container']}>
            <motion.div
                className={styles['login-box']}
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <h2>Welcome Back!</h2>
                <p>Log in to access all your pet care essentials.</p>
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    <motion.label htmlFor="email" variants={inputVariants}>
                        Email Address
                    </motion.label>
                    <motion.input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        variants={inputVariants}
                    />

                    <motion.label htmlFor="password" variants={inputVariants}>
                        Password
                    </motion.label>
                    <motion.input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        variants={inputVariants}
                    />

                    {formMsg && <motion.p className={styles['errorMsg']} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{formMsg}</motion.p>}

                    <motion.button
                        type="submit"
                        className={styles['submit']}
                        id="login"
                        variants={buttonVariants}
                        disabled={isLoading}
                    >
                        {
                            isLoading ? <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> : 'Login'
                        }
                    </motion.button>
                </form>
                <p className={styles['register-link']}>
                    New to Fur-tual Friend?
                    <Link to="/register">
                        Create New Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

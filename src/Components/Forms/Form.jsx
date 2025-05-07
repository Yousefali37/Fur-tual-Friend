import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import styles from "./Css/Forms.module.css";

export default function Forms({ handleSubmit, inputsValues, SetInputValues, Msg, Loading, page }) {

    const isSignup = page === 'signup';
    const adduser = page === 'adduser';
    const edituser = page === 'edituser';

    // Animation variants for input fields
    const inputVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    // Animation variant for button
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <motion.div
                    className="mb-3"
                    initial="hidden"
                    animate="visible"
                    variants={inputVariants}
                >
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Enter your name..."
                        value={inputsValues.name}
                        onChange={(e) => SetInputValues({ ...inputsValues, name: e.target.value })}
                    />
                </motion.div>
                <motion.div
                    className="mb-3"
                    initial="hidden"
                    animate="visible"
                    variants={inputVariants}
                >
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email..."
                        value={inputsValues.email}
                        onChange={(e) => SetInputValues({ ...inputsValues, email: e.target.value })}
                    />
                </motion.div>
                <motion.div
                    className="mb-3"
                    initial="hidden"
                    animate="visible"
                    variants={inputVariants}
                >
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter your password..."
                        value={inputsValues.password}
                        onChange={(e) => SetInputValues({ ...inputsValues, password: e.target.value })}
                    />
                </motion.div>
                {isSignup || adduser || edituser ? (
                    <motion.div
                        className="mb-3"
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Confirm your password..."
                            value={inputsValues.confirmPassword}
                            onChange={(e) => SetInputValues({ ...inputsValues, confirmPassword: e.target.value })}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        className="mb-3"
                        initial="hidden"
                        animate="visible"
                        variants={inputVariants}
                    >
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            name="message"
                            id="message"
                            rows="5"
                            placeholder="Write Us A Message..."
                            value={inputsValues.message}
                            onChange={(e) => SetInputValues({ ...inputsValues, message: e.target.value })}
                        ></textarea>
                    </motion.div>
                )}
                {Msg && (
                    <motion.div
                        className="text-danger mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {Msg}
                    </motion.div>
                )}
                <motion.button
                    type="submit"
                    className={isSignup ? `${styles['signup-btn']} w-100 mt-2` : `${styles['send-btn']} w-25 mt-3`}
                    disabled={Loading}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {Loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        isSignup ? "Sign Up" : adduser ? 'Add' : edituser ? 'Edit' : 'send'
                    )}
                </motion.button>
                {isSignup && (
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                )}
            </form>
        </Fragment>
    );
}

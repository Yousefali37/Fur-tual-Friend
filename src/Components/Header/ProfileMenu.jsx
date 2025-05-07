import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from './CSS/ProfileMenu.module.css';

function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        // Check if the user is logged in by verifying the presence of 'email' in localStorage
        setIsLoggedIn(!!localStorage.getItem('email'));
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const handleSignOut = () => {
        // Remove user email from localStorage and reload the page to reset the state
        localStorage.removeItem('email');
        window.location.reload();
    };

    return (
        <div className={styles['profile-menu']}>
            {/* Profile Image Button */}
            <Button variant="" onClick={toggleMenu}>
                <img
                    src={require('../../Assets/Images/user.png')}
                    alt="Profile"
                    className={`${styles['profile-img']} rounded-circle`}
                    width="30"
                />
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={styles['profile-dropdown']}>
                    <Link to={isLoggedIn ? '/profile-page' : '/login'}>
                        My Profile
                    </Link>
                    {
                        localStorage.getItem('email') === 'admin@gmail.com' && (
                            <Link to="/dashboard">Dashboad</Link>
                        ) 
                    }
                    <Link to="/chatbot">Chat Bot</Link>

                    {/* Icons Row */}
                    <div className="row justify-content-center gap-2 align-items-center">
                        <Link to="/cart" className="col-3 text-center">
                            <i className={`fa fa-shopping-cart ${styles['mirrored-icon']}`} aria-hidden="true"></i>
                        </Link>
                        <Link to="/favorites" className="col-3 text-center">
                            <i className={`fa fa-heart ${styles['mirrored-icon']}`} aria-hidden="true"></i>
                        </Link>
                        <Link to="/orders" className="col-3 text-center">
                            <i className={`fa fa-list-alt ${styles['mirrored-icon']}`} aria-hidden="true"></i>
                        </Link>
                    </div>

                    <hr />

                    {/* Authentication Buttons */}
                    {isLoggedIn ? (
                        <button className="btn btn-outline-danger" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-outline-primary">
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;

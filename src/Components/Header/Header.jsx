/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import styles from "./CSS/Header.module.css";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

function Header({ page }) {
    const profile = page === 'profile';
    const dashboard = page === 'dashboard';
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [name, setname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setIsNavOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleGoBack = () => {
        navigate('/');
    }

    return (
        <Navbar expand="lg" className={`${styles['navbar']}`}>
            {
                profile ? (
                    <Container>
                        <div className="text-start col-5">
                            <Navbar.Brand className={`${styles["navbar-brand"]}`} onClick={handleGoBack}>
                                <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> {name}
                            </Navbar.Brand>
                        </div>
                    </Container>
                ) :
                    dashboard ? (
                        <Container>
                            <div className="text-start">
                                <Navbar.Brand className={`${styles["navbar-brand"]}`} onClick={handleGoBack}>
                                    <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Dashboard{name}
                                </Navbar.Brand>
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <Navbar.Toggle
                                    aria-controls="basic-navbar-nav"
                                />
                            </div>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className={styles["nav-link"]} onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                                    <Nav.Link className={styles["nav-link"]} onClick={() => navigate('/dashboard/users')}>Users</Nav.Link>
                                    <Nav.Link className={styles["nav-link"]} onClick={() => navigate('/dashboard/products')}>Products</Nav.Link>
                                    <Nav.Link className={styles["nav-link"]} onClick={() => navigate('/dashboard/blogs')}>Blogs</Nav.Link>
                                    <Nav.Link className={styles["nav-link"]} onClick={() => navigate('/dashboard/faq')}>FAQs</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    ) : (
                        <Container>
                            <div className="text-start col-5">
                                <Navbar.Brand href="/" className={styles["navbar-brand"]}>
                                    <i className="fa-solid fa-paw"></i> Fur-Tual Friend
                                </Navbar.Brand>
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <Navbar.Toggle
                                    aria-controls="basic-navbar-nav"
                                />
                            </div>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/" className={styles["nav-link"]}>Home</Nav.Link>
                                    <Nav.Link href="/#about" className={styles["nav-link"]}>About</Nav.Link>
                                    <NavDropdown title="Pages" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="products">Our Products</NavDropdown.Item>
                                        <NavDropdown.Item href="AllArticals">Our Blogs</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <ProfileMenu />
                            </Navbar.Collapse>
                        </Container>
                    )
            }
        </Navbar>
    );
}

export default Header;

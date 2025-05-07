import React, { useEffect, useState } from 'react';
import styles from './CSS/Blog.module.css';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching blogs data
        fetch('http://127.0.0.1:8000/api/blogs')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                return res.json();
            })
            .then((data) => setBlogs(data))
            .catch((err) => setError(err.message));
    }, []); // Dependency array added to prevent repeated API calls

    const handleShowMoreClick = () => {
        const isAuthenticated = localStorage.getItem('email');
        navigate(isAuthenticated ? 'AllArticals' : '/login');
    };

    return (
        <div id="blog" className={styles.blog}>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center">Our Blog</h1>

                {error && (
                    <p className="text-danger mt-3">
                        Error loading blogs: {error}
                    </p>
                )}

                <div className={`${styles['featured-posts']} container mt-5`}>
                    <div className="row gap-5 justify-content-center align-items-center">
                        {blogs.length === 0 && !error ? (
                            <p className="text-muted">No blogs available.</p>
                        ) : (
                            blogs.slice(0, 3).map((blog) => (
                                <Card
                                    key={blog.id}
                                    id={blog.id}
                                    title={blog.title}
                                    desc={blog.description}
                                    src={require(`../../Assets/Images/${blog.img}`)}
                                    page="blog"
                                />
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleShowMoreClick}
                        className={`btn ${styles['btn-primary']} mt-5 shadow`}
                        aria-label="Show more blogs"
                    >
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
}

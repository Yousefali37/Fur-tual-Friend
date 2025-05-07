import React, { useEffect, useState } from 'react';
import styles from './CSS/Blog.module.css';
import Card from './../Card/Card';

export default function AllBlogs() {
    const [cardsNumber, setCardsNumber] = useState(3);
    const [Blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs')
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error(error));
    }, [])

    const showMoreCards = () => {
        setCardsNumber(cardsNumber + 3);
    };

    const handleClick = () => {
        window.history.back();
    };

    return (
        <div id={styles.AllBlogs}>
            <div className='row fixed-top justify-content-start align-items-center position-relative'>
                <button className={'go-back-btn col-1 p-1 shadow'} onClick={handleClick}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
            </div>
            <div className="container d-flex flex-column justify-content-center align-items-center pt-5 mt-4">
                <h1 className="text-center mt-5">Our Blog</h1>
                <div className={`${styles['featured-posts']} container mt-5`}>
                    <div className="row gap-3 justify-content-center align-items-center">
                        {
                            Blogs.slice(0, cardsNumber).map((blog) => {
                                return (
                                    <Card
                                        key={blog.id}
                                        id={blog.id}
                                        title={blog.title}
                                        desc={blog.description}
                                        src={require(`../../Assets/Images/${blog.img}`)}
                                        page="blog"
                                    />
                                )
                            }
                            )}
                    </div>
                </div>
                <div>
                    <button className={`btn ${styles['btn-primary']} mt-5 shadow`} onClick={showMoreCards}>
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
}

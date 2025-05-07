/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CSS/BlogShow.module.css';
import { motion } from 'framer-motion';

export default function BlogShow() {
    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [sectionsData, setSectionsData] = useState([]);
    

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/blogs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data);
                setSectionsData(JSON.parse(data.sections));
            })
            .catch((error) => console.error("Error fetching blog:", error));
    }, [id]);

    if (!blog) {
        return <p>Loading...</p>;
    }

    const handleClick = () => {
        window.history.back();
    };

    return (
        <div id={styles.blogShow}>
            <div className='row fixed-top justify-content-start align-items-center position-relative'>
                <button className={'go-back-btn col-1 p-1 shadow'} onClick={handleClick}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
            </div>
            {blog && blog.title ? (
                <div className={styles.blogContainer} key={blog.id}>
                    <motion.h1
                        className={styles.blogTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {blog.title}
                    </motion.h1>
                    <motion.p
                        className={styles.blogDesc}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        {blog.description}
                    </motion.p>
                    <hr />
                    <div className={''}>
                        {sectionsData && sectionsData.length > 0 ? (
                            sectionsData.map((section, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.section}
                                    style={{ '--order': index }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                >
                                    <h3>{section.title}</h3>
                                    <p>{section.content}</p>
                                </motion.div>
                            ))
                        ) : (
                            <p>No sections available</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className={styles.notFound}>Blog not found</p>
            )}
            <hr />
            <i className="fa fa-copyright" aria-hidden="true"> El3rb</i>
        </div>
    );
}

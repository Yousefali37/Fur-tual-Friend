/* eslint-disable no-unused-vars */
import './CSS/Profile.css';
import Header from './../Header/Header';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Profile() {
    const [headerImg, setHeaderImg] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [EditProfile, setEditProfile] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [hovered, setHovered] = useState(false); // لتفعيل تأثير hover
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        bio: '',
        headerImg: '',
        profileImg: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/users')
        .then(res => res.json())
        .then(data => console.log(data))
    })

    const handleEditProfile = () => {
        setEditProfile(true);
    }

    const handleDoubleClick = () => {
        if (EditProfile) {
            setDisabled(false);
        }
    }


    return (
        <>
            <Header page={'profile'} />
            <motion.div
                className="profile-page container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="banner-wrapper col-12 text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img
                        src={headerImg || require('../../Assets/Images/banner-951877_1920.jpg')}
                        alt="Header"
                        className={`img-fluid rounded ${EditProfile ? 'edit-hover' : ''}`}
                    />
                    {EditProfile && hovered && (
                        <div className="edit-overlay">
                            <span>Edit</span>
                        </div>
                    )}
                    {EditProfile && (
                        <input
                            type="file"
                            className="file-input"
                        />
                    )}
                </motion.div>

                <motion.div
                    className="profile-info-wrapper my-4"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className='profile-info d-flex flex-column justify-content-around align-items-end'>
                        <img
                            src={profileImg || require('../../Assets/Images/user.png')}
                            alt="Profile"
                            className={`rounded-circle border-3 border-dark shadow-sm ${EditProfile ? 'edit-hover' : ''}`}
                            width="120"
                            height="120"
                        />
                        {EditProfile && hovered && (
                            <div className="edit-overlay">
                                <span>Edit</span>
                            </div>
                        )}
                        {EditProfile && (
                            <input
                                type="file"
                                className="file-input"
                            />
                        )}
                        <br />
                        <input
                            value={localStorage.getItem('name')}
                            onChange={(e) => {
                                localStorage.setItem('name', e.target.value);
                            }}
                            onDoubleClick={handleDoubleClick}
                            disabled={disabled}
                        />
                    </div>
                    <button className="edit-btn btn btn-primary mx-4" onClick={handleEditProfile}>
                        Edit Profile
                    </button>
                </motion.div>
            </motion.div>
        </>
    );
}

export default Profile;

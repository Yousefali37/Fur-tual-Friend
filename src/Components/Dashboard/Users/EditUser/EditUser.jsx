/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../../../Register/CSS/Register.module.css";
import Forms from '../../../Forms/Form';

function EditUser()
{
    const navigate = useNavigate();

    const [inputsValues, SetInputValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const id = window.location.pathname.split('/').slice(-1)[0];

    const [ErrorMsg, SetErrorMsg] = useState('');
    const [Loading, SetLoading] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => SetInputValues({
            name: data.username,
            email: data.email,
        }))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = false;

        if (inputsValues.name.trim() === '') {
            SetErrorMsg('Name cannot be empty');
            isValid = false;
        }
        else if (!emailRegx.test(inputsValues.email)) {
            SetErrorMsg('Please Enter a valid email');
            isValid = false;
        }
        else if (inputsValues.password.length < 8) {
            SetErrorMsg('Your password must be at least 8 characters');
            isValid = false;
        }
        else if (inputsValues.password !== inputsValues.confirmPassword) {
            SetErrorMsg('Passwords do not match');
            isValid = false;
        }
        else {
            isValid = true;
            SetErrorMsg('');
        }

        if (isValid) {
            SetLoading(true);
            try {
                let res = await axios.put(`http://127.0.0.1:8000/api/users/${id}`, {
                    username: inputsValues.name,
                    email: inputsValues.email,
                    password: inputsValues.password,
                });
                if (res.status === 200) {
                    navigate('/dashboard/users');
                    SetInputValues({ name: '', email: '', password: '', confirmPassword: '' });
                }
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    SetErrorMsg(e.response.data.message);
                } else {
                    SetErrorMsg('An error occurred while registering');
                }
            } finally {
                SetLoading(false);
                window.location.reload();
            }
        }
    };

    // Animation variants for the form elements
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className='container w-50'>
            <motion.div
                className={`${styles.card} ${styles.signupCard}`}
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <h3 className={'text-center mb-4 p-1'}>Edit User</h3>

                <Forms 
                    handleSubmit={handleSubmit} 
                    inputsValues={inputsValues} 
                    SetInputValues={SetInputValues} 
                    Msg={ErrorMsg} 
                    Loading={Loading} 
                    page={'edituser'} 
                />
            </motion.div>
        </div>
    );
}

export default EditUser;
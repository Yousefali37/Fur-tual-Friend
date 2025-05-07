import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../../../Register/CSS/Register.module.css";
import Forms from "../../../Forms/Form";

function AddUsers()
{
    const navigate = useNavigate();

    const [inputsValues, SetInputValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [ErrorMsg, SetErrorMsg] = useState('');
    const [Loading, SetLoading] = useState(false);

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
                let res = await axios.post('http://127.0.0.1:8000/api/users', {
                    username: inputsValues.name,
                    email: inputsValues.email,
                    password: inputsValues.password,
                });
                if (res.status === 200) {
                    navigate('/login');
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
        <div className={'container'}>
            <motion.div
                className={`${styles.card} ${styles.signupCard}`}
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <h3 className={'text-center mb-4 p-1'}>Add New User</h3>

                <Forms 
                    handleSubmit={handleSubmit} 
                    inputsValues={inputsValues} 
                    SetInputValues={SetInputValues} 
                    Msg={ErrorMsg} 
                    Loading={Loading} 
                    page={'adduser'} 
                />
            </motion.div>
        </div>
    );
}

export default AddUsers;
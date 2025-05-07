/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFaq() {
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState({
        question: '',
        answer: ''
    });
    const [ErrorMsg, SetErrorMsg] = useState('');
    const [Loading, SetLoading] = useState(false);
    const [isValid, SetIsValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (faqs.question === '' || faqs.answer === '') {
            SetErrorMsg('Please fill out all fields');
            return;
        } else {
            SetErrorMsg('');
            SetIsValid(true);
        }


        if (isValid) {
            SetLoading(true); 

            try {
                let res = await axios.post('http://127.0.0.1:8000/api/faqs', {
                    ques: faqs.question,
                    answer: faqs.answer
                });
                if (res.status === 200) {
                    navigate('/dashboard/faqs');
                    setFaqs({ question: '', answer: '' });
                }
            } catch (e) {
                SetErrorMsg('Error adding FAQ');
            } finally {
                SetLoading(false);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question:</label>
                <input
                    type="text"
                    id="question"
                    name="question"
                    value={faqs.question}
                    onChange={(e) => setFaqs({ ...faqs, question: e.target.value })}
                    required
                />
                <hr />
                <label htmlFor="answer">Answer:</label>
                <textarea
                    id="answer"
                    name="answer"
                    cols={100}
                    rows={10}
                    value={faqs.answer}
                    onChange={(e) => setFaqs({ ...faqs, answer: e.target.value })}
                    required
                />
                <input type="submit" value="Add FAQ" disabled={Loading} />
            </form>

            {ErrorMsg && <p style={{ color: 'red' }}>{ErrorMsg}</p>}
            {Loading && <p>Loading...</p>}
        </div>
    )
}

export default AddFaq;

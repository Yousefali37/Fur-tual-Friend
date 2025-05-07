/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Faq() {
    const navigate = useNavigate();
    const [faq, setFaq] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        SetIsLoading(true);
        fetch('http://localhost:8000/api/faqs')
            .then((res) => res.json())
            .then((data) => setFaq(data))
            .catch((err) => console.log(err))
            .finally(() => SetIsLoading(false));
    }, [])

    const handleAddUser = () => {
        if (add || edit) {
            navigate("/dashboard/faq");
            setAdd(false);
            setEdit(false);
        } else {
            navigate("/dashboard/faq/addfaq");
            setAdd(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            let res = await axios.delete(`http://localhost:8000/api/faqs/${id}`)
            if (res.status === 200) {
                setFaq(faq.filter((faq) => faq.id !== id));
            }
        } catch (err) {
            console.error("Error deleting Question:", err);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }

    const handleEdit = (id) => {
        setEdit(!edit);
        navigate(`/dashboard/faq/editfaq/${id}`);
    };

    return (
        <div className="dash-products">
            {
                add ? (
                    <h1 className="heading">Add A Question</h1>
                ) : (
                    <h1 className="heading">FAQs List</h1>
                )
            }
            <div className="add-button mb-4 row gap-3 justify-content-center align-items-center">
                <button className="btn-add col-3" onClick={handleAddUser}>
                    {add || edit ? 'Show All FAQs' : 'Add New Question'}
                    <i className="fa fa-plus-circle p-1" aria-hidden="true"></i>
                </button>
            </div>
            {isLoading ? (
                <p className="loading">Loading...</p>
            ) : add ? (
                <Outlet />
            ) : edit ? (
                <Outlet />
            ) : (
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Question <i class="fa fa-question" aria-hidden="true"></i></th>
                                <th>Answer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faq.map((faq) => (
                                <tr key={faq.id} className="table-row">
                                    <td>{faq.id}</td>
                                    <td>{faq.ques}</td>
                                    <td>{faq.answer}</td>
                                    <td className="action-buttons">
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEdit(faq.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(faq.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Faq;
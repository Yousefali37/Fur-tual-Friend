import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(id) {
        setLoading(true);
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
            if (res.status === 204) {
                setUsers(users.filter((user) => user.id !== id));
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    const handleAddUser = () => {
        if (add || edit) {
            navigate("/dashboard/users");
            setAdd(false);
            setEdit(false);
        } else {
            navigate("/dashboard/users/adduser");
            setAdd(true);
        }
    };


    const handleEdit = (id) => {
        setEdit(!edit);
        navigate(`/dashboard/users/edituser/${id}`);
    };

    return (
        <div className="dash-products">
            {
                add ? (
                    <h1 className="heading">Add Users</h1>
                ) : (
                    <h1 className="heading">Users List</h1>
                )
            }
            <div className="add-button mb-4 row gap-3 justify-content-center align-items-center">
                <button className="btn-add col-3" onClick={handleAddUser}>
                    {add || edit ? 'Show All Users' : 'Add New User'}
                    <i className="fa fa-plus-circle p-1" aria-hidden="true"></i>
                </button>
            </div>
            {loading ? (
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Of Birth</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="table-row">
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dateofbirth}</td>
                                    <td className="action-buttons">
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEdit(user.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(user.id)}
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
    );
}

export default Users;
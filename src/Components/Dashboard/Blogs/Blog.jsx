/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Blogs() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs')
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []);

    const handleAddblog = () => {
        if (add || edit) {
            navigate("/dashboard/blogs");
            setAdd(false);
            setEdit(false);
        } else {
            navigate("/dashboard/blogs/addblog");
            setAdd(true);
        }
    }

    const handleEdit = (id) => {
        navigate(`/dashboard/blogs/editblog/${id}`);
        setEdit(true);
    }

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/blogs/${id}`);
            if (res.status === 204) {
                setBlogs(blogs.filter((blog) => blog.id !== id)); // Removing the deleted blog from the state
            }
        } catch (err) {
            console.error("Error deleting Blog:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="dash-products">
            {
                add ? (
                    <h1 className="heading">Add blogs</h1>
                ) : edit ? (
                    <h1 className="heading">Edit blog</h1>
                ) : (
                    <h1 className="heading">Blogs List</h1>
                )
            }
            <div className="add-button mb-4 row gap-3 justify-content-center align-items-center">
                <button className="btn-add col-3" onClick={handleAddblog}>
                    {add || edit ? 'Show All blogs' : 'Add New blog'}
                    <i className="fa fa-plus-circle p-1" aria-hidden="true"></i>
                </button>
            </div>
            {loading ? (
                <p className="loading">Loading...</p>
            ) : add || edit ? (
                <Outlet />
            ) : (
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="table-row">
                                    <td>{blog.id}</td>
                                    <td>{blog.title}</td>
                                    <td>{blog.description}</td>
                                    <td>
                                        <img
                                            src={require(`../../../Assets/Images/${blog.img}`)}
                                            alt={blog.title}
                                            className="product-image"
                                        />
                                    </td>
                                    <td className="action-buttons">
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEdit(blog.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(blog.id)}
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

export default Blogs;

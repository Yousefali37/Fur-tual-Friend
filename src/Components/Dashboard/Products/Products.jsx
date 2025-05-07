/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleAddUser = () => {
        if (add || edit) {
            navigate("/dashboard/products");
            setAdd(false);
            setEdit(false);
        } else {
            navigate("/dashboard/products/addproduct");
            setAdd(true);
        }
    };

    const handleEdit = (id) => {
        setEdit(!edit);
        navigate(`/dashboard/products/editproduct/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
            if (res.status === 204) {
                setProducts(products.filter((product) => product.id !== id));
            }
        } catch (e) {
            console.error("Error deleting product:", e);
        } finally {
            window.location.reload();
        }
    };

    return (
        <div className="dash-products">
            <h1 className="heading">{add ? 'Add New Product' : edit ? 'Edit Product' : 'Products List'}</h1>
            <div className="add-button mb-4 row gap-3 justify-content-center align-items-center">
                <button className="btn-add col-3" onClick={handleAddUser}>
                    {add || edit ? 'Show All Products' : 'Add New Product'}
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="table-row">
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <img
                                            src={require(`../../../Assets/Images/${product.img}`)}
                                            alt={product.title}
                                            className="product-image"
                                        />
                                    </td>
                                    <td className="action-buttons">
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(product.id)}
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


export default DashProducts;

/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

function EditProduct() {
    const [products, setProducts] = useState({
        title: "",
        price: "",
        img: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const id = window.location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProducts({
                title: data.title,
                price: data.price,
                img: data.img
            }))
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!products.title || !products.price || !products.img) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            let res = await axios.put(`http://127.0.0.1:8000/api/products/${id}`, {
                title: products.title,
                price: products.price,
                img: products.img
            });
            if (res.status === 200) {
                alert("Product Updated successfully");
                setProducts({
                    title: "",
                    price: "",
                    img: ""
                });
            }
        } catch (e) {
            setError("Error Updating product. Please try again.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };


    return (
        <div className="container">
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <form
                    className="container border-1 shadow p-3 mb-5 bg-white rounded"
                    onSubmit={handleSubmit}
                >
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={products.title}
                        onChange={(e) =>
                            setProducts({ ...products, title: e.target.value })
                        }
                        required
                    />
                    <label>Product Price:</label>
                    <input
                        type="number"
                        name="productPrice"
                        value={products.price}
                        onChange={(e) =>
                            setProducts({ ...products, price: e.target.value })
                        }
                        required
                    />
                    <label>Product Image:</label>
                    <input
                        type="text"
                        name="productImage"
                        value={products.img}
                        onChange={(e) =>
                            setProducts({ ...products, img: e.target.value })
                        }
                        required
                    />
                    <button type="submit" disabled={loading}>
                        Update Product
                    </button>
                </form>
            )}
        </div>
    )
}

export default EditProduct;
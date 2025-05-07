import axios from "axios";
import { useState } from "react";

function AddBlog() {
    const [blog, setBlog] = useState({
        title: "",
        img: "",
        description: "", // إضافة الحقل الجديد
    });
    const [sections, setSections] = useState([{ title: "", content: "" }]); // تعديل اسم المتغير ليعبر عن الأقسام
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // إضافة قسم جديد
    const addSection = () => {
        setSections([...sections, { title: "", content: "" }]);
    };

    // تحديث محتوى القسم
    const updateSection = (index, key, value) => {
        const updatedSections = [...sections];
        updatedSections[index][key] = value;
        setSections(updatedSections);
    };

    // إرسال البيانات
    const handleSubmit = async (e) => {
        e.preventDefault();

        // التحقق من القيم
        if (!blog.title || !blog.img || !blog.description || sections.some(section => !section.title || !section.content)) {
            setError("All fields (including sections) are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/blogs", {
                title: blog.title,
                img: blog.img,
                description: blog.description,
                sections: sections, // إرسال الأقسام
            });

            if (res.status === 200) {
                alert("Blog added successfully");
                setBlog({ title: "", img: "", description: "" });
                setSections([{ title: "", content: "" }]);
            }
        } catch (e) {
            setError("Error adding blog. Please try again.");
        } finally {
            setLoading(false);
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
                    <label>Blog Title:</label>
                    <input
                        type="text"
                        name="blogTitle"
                        value={blog.title}
                        onChange={(e) =>
                            setBlog({ ...blog, title: e.target.value })
                        }
                        required
                    />
                    <label>Blog Image:</label>
                    <input
                        type="text"
                        name="blogImage"
                        value={blog.img}
                        onChange={(e) =>
                            setBlog({ ...blog, img: e.target.value })
                        }
                        required
                    />
                    <label>Blog Description:</label>
                    <textarea
                        rows="3"
                        cols={80}
                        name="blogDescription"
                        value={blog.description}
                        onChange={(e) =>
                            setBlog({ ...blog, description: e.target.value })
                        }
                        required
                    />
                    <label>Blog Content:</label>
                    {sections.map((section, index) => (
                        <div key={index} className="section-group">
                            <input
                                type="text"
                                placeholder={`Section ${index + 1} Title`}
                                value={section.title}
                                onChange={(e) =>
                                    updateSection(index, "title", e.target.value)
                                }
                                required
                            />
                            <textarea
                                rows="3"
                                cols={80}
                                placeholder={`Section ${index + 1} Content`}
                                value={section.content}
                                onChange={(e) =>
                                    updateSection(index, "content", e.target.value)
                                }
                                required
                            ></textarea>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSection}
                        className="btn btn-secondary my-2"
                    >
                        Add Section
                    </button>
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        Add Blog
                    </button>
                </form>
            )}
        </div>
    );
}

export default AddBlog;

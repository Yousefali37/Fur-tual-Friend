import axios from "axios";
import { useEffect, useState } from "react";

function EditBlog() {
    const [blog, setBlog] = useState({
        title: '',
        img: '',
        content: []
    });
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sectionsData, setSectionsData] = useState([]);

    const id = window.location.pathname.split('/').slice(-1)[0];

    useEffect(() => {
        fetch(`http://localhost:8000/api/blogs/${id}`)
            .then(res => res.json())
            .then((data) => {
                setBlog(data);
                try {
                    const sections = typeof data.sections === "string" ? JSON.parse(data.sections) : data.sections || [];
                    setSectionsData(sections);
                } catch (error) {
                    console.log("Error parsing sections:", error);
                    setSectionsData([]);
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    const addSection = () => {
        const newSection = { title: '', content: '' };
        const updatedSectionsData = [...sectionsData, newSection];
        setSectionsData(updatedSectionsData);
        setBlog({ ...blog, content: updatedSectionsData });
    };

    const handleSectionChange = (index, key, value) => {
        const updatedSectionsData = [...sectionsData];
        updatedSectionsData[index][key] = value;
        setSectionsData(updatedSectionsData);
        setBlog({ ...blog, content: updatedSectionsData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (blog.title === '' || blog.img === '' || (blog.content && blog.content.some(section => section.content === '' || section.title === ''))) {
            setErrors("All fields are required");
            return;
        } else {
            setErrors('');
        }
    
        setIsLoading(true);
        try {
            let res = await axios.put(`http://localhost:8000/api/blogs/${id}`, {
                title: blog.title,
                img: blog.img,
                sections: JSON.stringify(blog.content)
            });
            if (res.status === 200) {
                alert("Blog edited successfully");
            } else {
                alert("Failed to edit blog");
            }
        } catch (err) {
            console.log(err);
            alert("Error editing blog");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={blog.title}
                    onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                />

                <label htmlFor="img">Image</label>
                <input
                    type="text"
                    id="img"
                    name="img"
                    value={blog.img}
                    onChange={(e) => setBlog({ ...blog, img: e.target.value })}
                />

                {sectionsData && sectionsData.map((section, index) => (
                    <div key={index}>
                        <label htmlFor={`section-title-${index}`}>Section {index + 1} Title</label>
                        <input
                            type="text"
                            id={`section-title-${index}`}
                            value={section.title}
                            onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                            placeholder={`Title for section ${index + 1}`}
                        />

                        <label htmlFor={`section-content-${index}`}>Section {index + 1} Content</label>
                        <textarea
                            id={`section-content-${index}`}
                            value={section.content}
                            onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                            rows="5"
                            cols={100}
                            placeholder={`Content for section ${index + 1}`}
                        />
                    </div>
                ))}

                <button type="button" onClick={addSection} className="btn btn-secondary my-2">
                    Add Section
                </button>

                {errors && <p className="error">{errors}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Edit Blog"}
                </button>
            </form>
        </div>
    );
}

export default EditBlog;

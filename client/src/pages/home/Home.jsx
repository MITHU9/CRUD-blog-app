/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, setBlogList, loading, setLoading } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchBlogList = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;
    console.log(result.blogList);

    if (result) {
      setBlogList(result.blogList);
      setLoading(false);
    }
  };

  //edit blog
  const HandleEdit = async (item) => {
    navigate("/add-blog", { state: item });
    // const response = await axios.put(
    //   `http://localhost:5000/api/blogs/update/${id}`
    // );
    // const result = await response.data;
    // console.log(result.status);
  };

  //delete blog
  const HandleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${id}`
    );
    console.log(response.status);

    if (response.status === 200) {
      fetchBlogList();
    }
  };

  // console.log(blogList);
  // console.log(Array.isArray(blogList));

  useEffect(() => {
    fetchBlogList();
  }, []);

  return (
    <div className="py-5">
      <h2 className="text-2xl font-bold py-4">Blog List</h2>

      <div className="flex items-center flex-wrap gap-3">
        {loading ? (
          <p>Loading...</p>
        ) : blogList.length > 0 ? (
          blogList.map((blog) => (
            <div key={blog._id} className="py-2 border p-6 rounded-lg">
              <h3 className="font-bold text-xl">
                Title: <span className="font-semibold">{blog.title}</span>
              </h3>
              <p className="font-bold text-xl">
                Content: <span className="font-semibold">{blog.content}</span>{" "}
              </p>
              <p className="font-semibold">CreatedDate: {blog.date}</p>
              <div className="flex items-center gap-3 py-4">
                <button
                  onClick={() => HandleEdit(blog)}
                  className="text-2xl p-2 hover:bg-gray-300 rounded-lg"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => HandleDelete(blog._id)}
                  className="text-2xl p-2 hover:bg-gray-300 rounded-lg"
                >
                  <RiDeleteBin5Fill />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="">No blogs found</h2>
        )}
      </div>
    </div>
  );
};
export default Home;

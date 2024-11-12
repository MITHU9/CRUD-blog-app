/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddBLog = () => {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state._id);

  const handleSaveFormDataToDatabase = async () => {
    // const response = await fetch("http://localhost:5000/api/blogs/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: formData.title,
    //     content: formData.content,
    //   }),
    // });
    // const data = await response.json();

    const response = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state._id}`,
          {
            title: formData.title,
            content: formData.content,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          content: formData.content,
        });
    const result = await response.data;

    if (result) {
      setIsEdit(false);
      setFormData({ title: "", content: "" });
      navigate("/");
    }

    //console.log(result);
  };
  //console.log(formData);

  useEffect(() => {
    if (location.state) {
      setIsEdit(true);
      setFormData({
        title: location.state.title,
        content: location.state.content,
      });
    }
  }, [location.state]);

  return (
    <div className=" flex flex-col py-7">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Blog" : "Add Blog"}
      </h1>

      <div className="flex flex-col gap-5 py-2 max-w-[500px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            className="border border-gray-400 p-2 outline-none rounded-lg"
            name="title"
            type="text"
            id="title"
            placeholder="Enter Blog title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            className="border border-gray-400 p-2 outline-none rounded-lg"
            id="content"
            placeholder=" Enter Blog content here..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </div>
        <div>
          <button
            onClick={handleSaveFormDataToDatabase}
            className="border py-2 px-4 rounded-lg font-bold bg-gray-700 text-white"
          >
            {isEdit ? "Update" : "Add Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddBLog;

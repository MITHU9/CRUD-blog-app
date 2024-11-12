import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex container mx-auto items-center justify-between mt-6">
      <h2 className="text-3xl text-green-700 font-bold">Mern Blog App</h2>
      <ul className="flex items-center gap-8 font-bold ">
        <Link to="/" className="cursor-pointer hover:text-red-600 underline">
          Home
        </Link>
        <Link
          to="/add-blog"
          className="cursor-pointer hover:text-red-600 underline"
        >
          Add Blog
        </Link>
      </ul>
    </div>
  );
};
export default Header;

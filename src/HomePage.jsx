import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 gap-10">
        <h1 className="text-5xl font-bold">Welcome To MFS Web Application</h1>
        <div>
          <p className="text-2xl font-bold">
            Please login or register to continue
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <Link to="/login" className="">
              <button className="bg-primary text-white px-4 py-2 rounded-md border font-semibold hover:bg-secondary">
                Login
              </button>
            </Link>
            <Link to="/register" className="">
              <button className="bg-primary text-white px-4 py-2 rounded-md border font-semibold hover:bg-secondary">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default HomePage;
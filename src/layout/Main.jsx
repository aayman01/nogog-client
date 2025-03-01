import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet/>
        </div>
    );
};

export default Main;
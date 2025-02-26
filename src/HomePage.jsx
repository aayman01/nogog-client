import useUser from "./hooks/useUser";


const HomePage = () => {
    const { userInfo, userLoading, userError } = useUser();

    if (userLoading) {
        return <div>Loading user info...</div>;
    }

    if (userError) {
        return <div>Error: {userError}</div>;
    }

    if (userInfo) {
        return (
            <div>
                <p>Welcome, {userInfo?.name}!</p>
                {/* ... display other user information */}
            </div>
        );
    }

    return null; 
};

export default HomePage;
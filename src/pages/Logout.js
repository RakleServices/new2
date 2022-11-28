import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload(false);
    }, [])
    return <div className="title"> Logging Out...</div>;
};

export default Logout;
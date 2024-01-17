import React from "react";
import "../styles/Login.css";
import logo from "../assets/logos/logo_yard_sale.svg";
import axios from "axios";
import useInitialState from "../Hooks/useInitialState";
import AppContext from "../context/AppContext";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const form = React.useRef(null);
    const { saveClient } = React.useContext(AppContext);
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        const data = {
            "correo": formData.get("username"),
            "contrasenia": formData.get("password"),
        };

        const rta = await axios.post("http://localhost:5000/login", data);
        saveClient(rta.data);

        if (rta.data.rol===1){
            navigate("/home");
        }else{
            navigate("/admin");
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <img src={logo} alt="logo" className="logo" />
                <form ref={form} className="form">
                    <label htmlFor="email" className="label">
                        Email address
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="platzi@example.cm"
                        className="input input-email"
                    />
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="*********"
                        className="input input-password"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="primary-button login-button"
                    >Login</button>

                </form>

            </div>
        </div>
    );
};

export default Login;

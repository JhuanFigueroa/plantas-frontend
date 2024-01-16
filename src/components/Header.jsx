import React from "react";
import '../styles/Header.css'
import shopingCar from "../assets/icons/icon_shopping_cart.svg";
import AppContext from "../context/AppContext";
import axios from "axios";
import menu from "../assets/icons/icon_menu.svg";
import logo from "../assets/logos/logo_yard_sale.svg";
import MyOrder from "./MyOrder";
import {Link} from "react-router-dom";
const Header=()=>{
    const [toggleOrders, setToggleOrders] = React.useState(false);
    const [categorias, setCategorias] = React.useState([]);
    const { state } = React.useContext(AppContext);

    const getCategories = async () => {
        const res = await axios.get("http://localhost:5000/categorias");
        setCategorias(res.data);
        console.log(res.data);
    };
    React.useEffect(() => {
        getCategories();
    }, []);
    return (
        <nav>
            <img src={menu} alt="menu" className="menu" />

            <div className="navbar-left">
                <img src={logo} alt="logo" className="nav-logo" />

                <ul>
                    <li>
                        <a href="/home">All</a>
                    </li>
                    {categorias.map((categoria) => (
                        <li>
                            <Link to={`/categoria/${categoria.id}`}>{categoria.nombre}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-right">
                <ul>
                    <li className="navbar-email">
                        {state.cliente.correo}
                    </li>
                    <li
                        className="navbar-shopping-cart"
                        onClick={() => setToggleOrders(!toggleOrders)}
                    >
                        <img src={shopingCar} alt="shopping cart" />
                        {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
                    </li>
                </ul>
            </div>

            {!!toggleOrders && <MyOrder />}
        </nav>
    );
};

export default Header;
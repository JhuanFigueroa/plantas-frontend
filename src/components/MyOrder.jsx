import React from "react";
import flecha from "../assets/icons/flechita.svg";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import Product from "./Product";
import '../styles/MyOrder.css'
import OrderItem from "./OrderItem";
const MyOrder = () => {
    const { state } = React.useContext(AppContext);

    const sumTotal = () => {
        const reducer = (accumulator, currentValue) =>
            accumulator + (currentValue.precio*currentValue.cantidad);
        const sum = state.cart.reduce(reducer, 0);
        return sum;
    };

    return (
        <aside className="MyOrder">
            <div className="title-container">
                <img src={flecha} alt="arrow" />
                <p className="title">My order</p>
            </div>
            <div className="my-order-content">
                {state.cart.map((product) => (
                    product.cantidad>0 && <OrderItem product={product} key={`orderItem-${product.id}`} />
                ))}

                <div className="order">
                    <p>
                        <span>Total</span>
                    </p>
                    <p>${sumTotal()}</p>
                </div>

                {state.cliente.rol==1?(
                    <Link to={'/checkout'}> <button className="primary-button">Checkout</button></Link>
                ):state.cliente.rol==2?( <Link to={'/comprar'}> <button className="primary-button">Comprar</button></Link>):
                    (<div></div>)}
            </div>
        </aside>
    );
};

export default MyOrder;

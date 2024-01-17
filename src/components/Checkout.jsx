import React, {useState} from "react";
import OrderItem from "../components/OrderItem";
import "../styles/Checkout.css";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Checkout = () => {
    const { state } = React.useContext(AppContext);
    const {clearCart}=React.useContext(AppContext);
    const navigate=useNavigate();
    const [toggleNota,setToggleNota]=useState(false);
    const [monto,setMonto]=useState(0);
    const [cambio,setCambio]=useState(0);
    const sumTotal = () => {
        const reducer = (accumulator, currentValue) =>
            accumulator + (currentValue.precio*currentValue.cantidad);
        const sum = state.cart.reduce(reducer, 0);
        return sum;
    };

    const pagar=async () => {

        const venta = {
            cliente: state.cliente.id
        }

        //generar venta
        const resVenta = await axios.post("http://localhost:5000/venta",venta);
        console.log(resVenta.data)
        var ventaId=resVenta.data.id;

        //detalles de venta
        var detalles=[];
        state.cart.map( product => {

            const planta = {
                "cantidad": product.cantidad,
                "precio": product.precio * product.cantidad,
                "planta": product.id,
                "venta": ventaId
            }
            detalles.push(planta)
        });
        const rta =  axios.post("http://localhost:5000/detalle-venta",detalles);
         clearCart();
         navigate("/succes");
    }
    const mostrarNota=()=>{
        const sum=monto-sumTotal();
        setCambio(sum);
        setToggleNota(true);
    }

    const montoChange=(e)=>{
        setMonto(e.target.value)
    }
    return (
        <div className="Checkout">
            <div>
                <label htmlFor="monto" className="label">
                    Monto
                </label>
                <input
                    type="number"
                    name="monto"
                    placeholder="$$"
                    value={monto}
                    className="input input-email"
                    onChange={montoChange}
                />
                <button className="primary-button" onClick={()=>mostrarNota()}>Pagar</button>
            </div>

            {toggleNota && (
                <div className="Checkout-container">
                    <h1 className="title">My Orden</h1>
                    <div className="Checkout-content">

                        {state.cart.map((product) => (
                            <div className="order">
                                <p>{product.cantidad}:{product.nombre}</p>
                                <p>{product.precio*product.cantidad}</p>

                            </div>

                        ))}
                        <p><strong>Total $:</strong> {sumTotal()}</p>
                        <p><strong>Monto $:</strong> {monto}</p>
                        <p><strong>Cambio $:</strong> {cambio}</p>
                        <button className="primary-button" onClick={()=>pagar()}>Terminar</button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;

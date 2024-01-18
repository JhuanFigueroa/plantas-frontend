import React, {useEffect, useState} from "react";
import OrderItem from "../components/OrderItem";
import "../styles/Checkout.css";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Comprar = () => {
    const { state } = React.useContext(AppContext);
    const {clearCart}=React.useContext(AppContext);
    const navigate=useNavigate();
    const [toggleNota,setToggleNota]=useState(false);
    const [monto,setMonto]=useState(0);
    const [cambio,setCambio]=useState(0);
    const [proveedores,setProveedores]=useState([]);
    const [idProveedor, setIdProveedor] = useState('');

    const handleProveedorChange = (event) => {
        setIdProveedor(event.target.value);
    };
    const sumTotal = () => {
        const reducer = (accumulator, currentValue) =>
            accumulator + (currentValue.precio*currentValue.cantidad);
        const sum = state.cart.reduce(reducer, 0);
        return sum;
    };

    const pagar=async () => {

        const compra = {
            proveedor: idProveedor
        }

        //generar compra
        const resVenta = await axios.post("http://localhost:5000/compra",compra);
        console.log(resVenta.data)
        var compraId=resVenta.data.id;

        //detalles de compra
        var detalles=[];
        state.cart.map( product => {

            const detalle = {
                "cantidad": product.cantidad,
                "precio": product.precio * product.cantidad,
                "planta": product.id,
                "compra": compraId
            }
            detalles.push(detalle)
        });
        const rta =  axios.post("http://localhost:5000/detalle-compra",detalles);
        clearCart();
        navigate("/admin");
    }
    const mostrarNota=()=>{
        const sum=monto-sumTotal();
        setCambio(sum);
        setToggleNota(true);
    }
    const montoChange=(e)=>{
        setMonto(e.target.value)
    }
    const getProveedores=async()=>{
        const rta=axios.get("http://localhost:5000/proveedores");
        setProveedores((await rta).data);
    }
    useEffect(() => {
        getProveedores();
    }, []);
    return (
        <div className="Checkout">
            <div className="Checkout-content">
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
                <label htmlFor="monto" className="label">
                    Proveedor
                </label>

                <select
                    name=""
                    value={idProveedor}
                    onChange={handleProveedorChange}
                    className="input input-email"
                >
                    <option value="">--Seleccione--</option>

                    {proveedores.map((proveedor) => (
                        <option key={proveedor.id} value={proveedor.id}>
                            {proveedor.nombre}
                        </option>
                    ))}
                </select>
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

export default Comprar;

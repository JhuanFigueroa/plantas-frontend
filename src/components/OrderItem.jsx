import React from 'react';
import '../styles/OrderItem.css';
import close from '../assets/icons/icon_close.png';
import AppContext from '../context/AppContext';

const OrderItem = ({product}) => {
    const {removeFromCart}=React.useContext(AppContext);
    return (
        <div className="OrderItem">
            <figure>
                <img src="" alt={product.nombre}  style={{maxWidth:"30px"}}/>
            </figure>
            <p>{product.cantidad}:{product.nombre}</p>
            <p>{product.precio*product.cantidad}</p>

            <img src={close} alt="close" onClick={()=>removeFromCart(product)} />
        </div>
    );
}

export default OrderItem;
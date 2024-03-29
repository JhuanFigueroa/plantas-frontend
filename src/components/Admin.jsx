import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/ProductInfo.css'
import Product from "./Product";
import addToCartImg from "../assets/icons/bt_add_to_cart.svg";
import {Link} from "react-router-dom";
import AppContext from "../context/AppContext";

const Admin=()=>{
    const {setProducts}=React.useContext(AppContext);
    const {addToCart}=React.useContext(AppContext);
    const {state}=React.useContext(AppContext);
    const handleClick=(item)=>{
        item.existencias+=1;
        addToCart(item);
    }
    const getProducts=async () => {
        const res = await axios.get("http://localhost:5000/plantas");
        setProducts(res.data);
    }
    useEffect( () => {
        getProducts();
    }, []);
    return(
        <section className="main-container">
            <Link to={'/formPlanta'}> <button className="primary-button">Agregar</button></Link>
            <div className="ProductList">
                {state.products.map(product=> (
                    <div className="ProductItem">
                        <img
                            src={product.imagen} // Ajusta el tipo de imagen según tu necesidad
                            alt={product.nombre}
                        />
                        <div className="product-info">
                            <div>
                                <p>{product.nombre}</p>
                                <p>${product.precio}</p>
                                <p>cantidad:{product.existencias}</p>
                                <p>Stock min:{product.stock_min}</p>
                                <p>Stock max:{product.stock_max}</p>
                            </div>

                        </div>
                        <div>
                            {product.existencias!=product.stock_max && (<button className="secondary-button"  onClick={()=>handleClick(product)}>Comprar</button>)}
                    </div>

                    </div>
                ))}
            </div>
        </section>
    );
}

export default Admin;
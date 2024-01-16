import React, {useEffect, useState} from "react";
import axios from "axios";
import Product from "../components/Product";
import '../styles/ProductList.css'
import {useParams} from "react-router-dom";
const Categoria=()=>{
    const[products,setProducts]=useState([]);
    const{id}=useParams();
    const getProducts=async () => {
        const res = await axios.get("http://localhost:5000/categoria/"+id);
        setProducts(res.data);
    }
    useEffect( () => {
        getProducts();
    }, [id]);
    return(
        <section className="main-container">
            <div className="ProductList">
                {products.map(product=> (
                    <Product
                        product={product} key={product.id} />
                ))}
            </div>
        </section>
    );
}

export default Categoria;
import React, {useEffect, useState} from "react";
import axios from "axios";
import Product from "../components/Product";
import '../styles/ProductList.css'
const ProductList=()=>{
    const[products,setProducts]=useState([]);
    const getProducts=async () => {
        const res = await axios.get("http://localhost:5000/plantas");
        setProducts(res.data);
    }
    useEffect( () => {
        getProducts();
    }, []);
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

export default ProductList;
import React from "react";
import AppContext from "../context/AppContext";
import '../styles/ProductItem.css';
import close from "../assets/icons/icon_close.png"
import addToCartImg from '../assets/icons/bt_add_to_cart.svg'
const Product=({product})=>{
    const {addToCart}=React.useContext(AppContext);
    const handleClick=(item)=>{
        item.existencias-=1;
        addToCart(item);
    }
    return(
      <div>

          <div className="ProductItem">
              <img
                  src={product.imagen}
                  alt={product.nombre}
              />
              <div className="product-info">
                  <div>
                      <p>${product.precio}</p>
                      <p>{product.nombre}</p>
                      <p>cantidad:{product.existencias}</p>
                  </div>
                  {product.existencias >0 ?(
                      <figure onClick={()=>handleClick(product)}>
                          <img src={addToCartImg} alt="" />
                      </figure>):(
                      <p>No disponible</p>
                  )}
              </div>
          </div>

      </div>
    );
}

export default Product;
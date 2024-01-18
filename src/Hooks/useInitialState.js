import React from "react";

const initalState = {
    cart: [],
    cliente:{},
    products:[],
};

const useInitialState = () => {
    const [state, setState] = React.useState(initalState);

    const addToCart = (payload) => {
        // Clonar el array del carrito para evitar mutaciones directas del estado
        const updatedCart = [...state.cart];

        // Verificar si el producto ya está en el carrito
        const existingProduct = updatedCart.find(item => item.id === payload.id);

        if (existingProduct) {
            // El producto ya está en el carrito, aumentar su cantidad en 1
            existingProduct.cantidad += 1;
        } else {
            // El producto no está en el carrito, agregarlo con cantidad inicial 1
            payload.cantidad = 1;
            updatedCart.push(payload);
        }

        // Actualizar el estado con el nuevo array del carrito
        setState({
            ...state,
            cart: updatedCart,
        });
    };

    const removeFromCart = (payload, quantityToRemove) => {
        const updatedCart = [...state.cart];
        const indexToRemove = updatedCart.findIndex(item => item.id === payload.id);

        if (indexToRemove !== -1) {
            // Si la cantidad a eliminar es menor o igual a la cantidad en el carrito, restarla
            if (quantityToRemove <= updatedCart[indexToRemove].cantidad) {
                updatedCart[indexToRemove].cantidad -= quantityToRemove;
            } else {
                // Si la cantidad a eliminar es mayor, eliminar completamente el producto del carrito
                updatedCart.splice(indexToRemove, 1);
            }
        }

        setState({
            ...state,
            cart: updatedCart,
        });
    };

    const clearCart = () => {
        setState({
            ...state,
            cart: [],
        });
    };

    const saveClient = ( clientInfo) => {
        setState({
            ...state,
            cliente: clientInfo,
        });
    };
    const setProducts=(payload)=>{
        setState({
            ...state,
            products: payload,
        })
    }

    return {
        state,
        addToCart,
        removeFromCart,
        clearCart,
        saveClient,
        setProducts,
    };
};

export default useInitialState;

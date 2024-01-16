import React from "react";

const initalState = {
    cart: [],
    cliente:{},
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

    const removeFromCart = (payload) => {
        const updatedCart = [...state.cart];

        if (updatedCart.length > 0) {

            updatedCart.pop();
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

    return {
        state,
        addToCart,
        removeFromCart,
        clearCart,
        saveClient
    };
};

export default useInitialState;

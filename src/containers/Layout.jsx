import React from "react";
import AppContext from "../context/AppContext";
import Login from "../components/Login";

const Layout=({children})=>{
    const { state } = React.useContext(AppContext);
    if (state.cliente.rol>0){
        return(
            <div>
                {children}
            </div>
        )
    }else{
        return(
            <div>
                <Login/>
            </div>
        )
    }
}

export default Layout;
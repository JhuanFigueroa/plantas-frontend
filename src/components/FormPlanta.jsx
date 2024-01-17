import React from "react";
import '../styles/CreateAccount.css'
const FormPlanta=()=>{
    const form = React.useRef(null);
    return(
        <div className="CreateAccount">
            <div className="CreateAccount-container">
                <h1 className="title">Planta</h1>
                <form action="/" className="form">
                    <div>
                        <label htmlFor="nombre" className="label">Nombre</label>
                        <input type="text" id="nombre" placeholder="Nombre" className="input input-name" />
                        <label htmlFor="descripcion" className="label">Descripcion</label>
                        <input type="text" id="descripcion" placeholder="Descripcion" className="input input-name" />
                        <label htmlFor="existencias" className="label">Existencias</label>
                        <input type="text" id="existencias" placeholder="Existencias" className="input input-name" />
                        <label htmlFor="stockMinimo" className="label">Stock minimo</label>
                        <input type="text" id="stockMinimo" placeholder="Stock minimo" className="input input-name" />
                        <label htmlFor="stockMaximo" className="label">Stock maximo</label>
                        <input type="text" id="stockMaximo" placeholder="Stock maximo" className="input input-name" />
                        <label htmlFor="existencias" className="label">Precio</label>
                        <input type="text" id="precio" placeholder="Precio" className="input input-name" />
                        <label htmlFor="categoria" className="label">Categoria</label>
                        <input type="text" id="categoria" placeholder="Categoria" className="input input-name" />

                    </div>
                    <input type="submit" value="Create" className="primary-button login-button" />
                </form>
            </div>
        </div>
    )
}

export default FormPlanta;
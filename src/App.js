import logo from './logo.svg';
import './App.css';
import './styles/global.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Layout from "./containers/Layout";
import Home from "./components/Home";
import {Fragment} from "react";
import React from "react";
import Checkout from "./components/Checkout";
import UseInitialState from "./Hooks/useInitialState";
import AppContext from "./context/AppContext";
import Header from "./components/Header";
import Categoria from "./containers/Categoria";
import Succes from "./components/Succes";
import Login from "./components/Login";
import Admin from "./components/Admin";
import FormPlanta from "./components/FormPlanta";
import Comprar from "./components/Comprar";
import ProductList from "./containers/ProductList";
function App() {
  const initialState=UseInitialState();
  return (
      <AppContext.Provider value={initialState}>
    <Fragment>
      <BrowserRouter>
        <Header/>
        <Layout>
          <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/home"} element={<ProductList/>}/>
            <Route path={"/checkout"} element={<Checkout/>}/>
            <Route path={"/comprar"} element={<Comprar/>}/>
            <Route path={"/categoria/:id"} element={<Categoria/>}/>
            <Route path={"/succes"} element={<Succes/>}/>
            <Route path={"/admin"} element={<Admin/>}/>
            <Route path={"/formPlanta"} element={<FormPlanta/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Fragment>
      </AppContext.Provider>
  );
}

export default App;

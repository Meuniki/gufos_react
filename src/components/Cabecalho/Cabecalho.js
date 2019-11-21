import React, {Component} from 'react';
import Logo from '../../assets/img/icon-login.png';
import '../../assets/css/cabecalho.css';
import {Link} from 'react-router-dom';

export default class Cabecalho extends Component{
    render(){
        return(
        <header className="cabecalhoPrincipal">
            <div className="container">
                <img src={Logo} alt="abc"/>

                <nav className="cabecalhoPrincipal-nav">

                    <Link to="/">Home</Link>
                    <Link to="/eventos">Eventos</Link>
                    <Link to="/categorias">Contato</Link>
                    <Link to="/login" className="cabecalhoPrincipal-nav-login">Login</Link>
                </nav>
            </div>
        </header>
        );
    }
}
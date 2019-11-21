import React, { Component } from 'react';
import '../../css/login.css';
import '../../../components/Cabecalho/Cabecalho'
import Axios from 'axios' // Importando o axios

export default class Login extends Component {

    constructor(){
        super();

        this.state = {
            email:"",
            senha:""
        }
    }

    atualizaEstado = (event) =>{
        this.setState({[event.target.name] : event.target.value});
    }

    realizarLogin = (event) => {
        event.preventDefault();

        let config = {
            headers: {
                "Content-Type":"application/json",
                "Access-Contrl-Allow-Origin":"*" //Cors
            }
        }

        Axios.post("http://localhost:5000/api/login",{
            email : this.state.email,
            senha : this.state.senha

        }, config)
        .then(response =>{
            console.log("Retorno do login: ", response);
        })
        .catch(erro => {
            console.log("Erro: ", erro)
        })
    }

    render() {
        return (
            <main>
                {/* <Cabecalho/> */}
            <section className="container flex">
                <div className="img__login"><div className="img__overlay"></div></div>
                
                <div className="item__login">
                    
                    <div className="row">
                        <div className="item">
                            {/* <img src="./assets/img/icon-login.png" className="icone__login" /> */}
                        </div>
                        <div className="item" id="item__title">
                            <p className="text__login" id="item__description">
                                Bem-vindo! Faça login para acessar sua conta.
                            </p>
                        </div>
                        <form onSubmit={this.realizarLogin}>
                            <div className="item">
                                <input
                                    className="input__login"
                                    placeholder="username"
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.atualizaEstado}
                                    id="login__email"
                                    />
                            </div>
                            <div className="item">
                                <input
                                    className="input__login"
                                    placeholder="password"
                                    type="password"
                                    name="senha"
                                    value={this.state.senha}
                                    onChange={this.atualizaEstado}
                                    id="login__password"
                                    />
                            </div>
                            <div className="item">
                                <button type="submit" className="btn btn__login" id="btn__login">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            </main>
        );
    }
}
import React, { Component } from 'react';
import Rodape from '../../../components/Rodape/Rodape';
import {Link} from 'react-router-dom';

// Importamos nosso logo dos Assets
// import logo from '../../img/';

class Categorias extends Component {
    render(){
        return(
            <div className="App">
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    {/* <img src={logo} /> */}
                    <Link to="/">Voltar</Link>

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                        
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                        <table id="tabela-lista">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo"></tbody>
                        </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                        <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Categoria
                        </h2>
                        <form>
                        <div className="container">
                            <input
                            type="text"
                            className="class__categoria"
                            id="input__categoria"
                            placeholder="tipo do evento"
                            />
                            <button
                            id="btn__cadastrar"
                            className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                            >
                            Cadastrar
                            </button>
                        </div>
                        </form>
                    </div>
                    </section>
                </main>
                <Rodape />
                componentWillMount(){
        console.log('Will')
    }

    componentDidMount(){
        console.log('Did')
    }

    componentDidUpdate(){
        console.log("Update")
    }

    componentWillUnmount(){
        console.log("Unmount")
    }
            </div>
        );
        
    }
}

export default Categorias;

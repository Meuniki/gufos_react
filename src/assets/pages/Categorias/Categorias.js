import React, { Component } from 'react';
import Rodape from '../../../components/Rodape/Rodape';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import Cabecario from '../../../components/Cabecalho/Cabecalho';

// Importamos nosso logo dos Assets
// import logo from '../../img/';

class Categorias extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            nome: "",
            loading: false,
            erroMsg: "",
            modal: false,
            editarModal: {
                categoriaId: "",
                titulo: ""
            }

        }
    }

    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    cadastrarCategoria = (event) => {
        event.preventDefault();
        console.log("Cadastrando");

        fetch("http://localhost:5000/api/categoria", {
            method: "POST",
            body: JSON.stringify({ titulo: this.state.nome }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }));
            })
            .catch(error => console.log(error))
    }

    listaAtualizada = () => {

        this.setState({ loading: true });

        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => {
                this.setState({ lista: data })
                this.setState({ loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            })
    }

    alterarCategoria = (produto) => {
        console.log(produto);

        this.setState({
            editarModal: {
                categoriaId: produto.categoriaId,
                titulo: produto.titulo
            }
        })

        // Abrir Modal
        this.toggle();
    }
    atualizaEditarModalTitulo(input) {
        this.setState({
            editarModal: {
                categoriaId: this.state.editarModal.id,
                titulo: input.target.value
            }
        })
    }
    salvarAlteracoes = (event) => {

        event.preventDefault();
        console.log(this.state.editarModal);

        fetch("http://localhost:5000/api/categoria/" + this.state.editarModal.categoriaId, {
            method: "PUT",
            body: JSON.stringify(this.state.editarModal),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(
                setTimeout(() => {
                    this.listaAtualizada()
                }, 1000)
            )
            .catch(error => console.log(error))

        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.deletarCategoria = this.deletarCategoria.bind(this);
        this.salvarAlteracoes = this.salvarAlteracoes.bind(this);

        // FecharModal
        this.toggle();
    }

    listaAtualizada = () => {
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }));
    }

    componentDidMount() {
        this.listaAtualizada();
    }

    deletarCategoria = (id) => {

        console.log("Excluindo");

        fetch("http://localhost:5000/api/categoria/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }));
            })
            .catch(error => {
                console.log(error)
                this.setState({ erroMsg: "Não foi possível excluir, verifique se não há eventos cadastrados nesta Categoria" })
            })
    }


    render() {
        return (
            <div className="App">
                <Cabecario/>
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

                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.lista.map(function (categoria) {
                                            return (
                                                <tr key={categoria.categoriaId}>
                                                    <td>{categoria.categoriaId}</td>
                                                    <td>{categoria.titulo}</td>
                                                    <td>
                                                        <button onClick={e => this.alterarCategoria(categoria)}>Alterar</button>
                                                        <button onClick={e => this.deletarCategoria(categoria.categoriaId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            );
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>

                            {this.state.loading && <i className="fa fa-spin fa-spinner fa-2x"></i>}

                            {this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div>}
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">
                                Cadastrar Categoria
                            </h2>
                            <form onSubmit={this.cadastrarCategoria}>
                                <div className="container">
                                    <input
                                        type="text"
                                        className="class__categoria"
                                        id="input__categoria"
                                        placeholder="tipo do evento"
                                        value={this.state.nome}
                                        onChange={this.atualizaNome.bind(this)}
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
                <MDBContainer>
                    <form>
                        <MDBBtn onClick={this.toggle}>Modal</MDBBtn>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}>Editar <b>{this.state.editarModal.titulo}</b> </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput
                                    label="Categoria"
                                    value={this.state.editarModal.titulo}
                                    onChange={this.atualizaEditarModalTitulo.bind(this)}
                                />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                <MDBBtn color="primary" onClick={this.salvarAlteracoes}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </form>
                </MDBContainer>
                <Rodape />

            </div>
        );
    }
    componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log('Will');
    }
    componentDidUpdate() {
        console.log("Update")
    }
    componentWillUnmount() {
        console.log("Unmount")
    }
}

export default Categorias;

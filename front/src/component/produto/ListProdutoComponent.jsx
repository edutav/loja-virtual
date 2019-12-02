import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListProdutoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            produtos: [],
            message: null
        }
        this.deleteProduto = this.deleteProduto.bind(this);
        this.editProduto = this.editProduto.bind(this);
        this.addProduto = this.addProduto.bind(this);
        this.reloadProdutoList = this.reloadProdutoList.bind(this);
    }

    componentDidMount() {
        this.reloadProdutoList();
    }

    reloadProdutoList() {
        ApiService.fetchProdutos()
            .then((res) => {
                this.setState({produtos: res.data})
            });
    }

    deleteProduto(produtoId) {
        ApiService.deleteProduto(produtoId)
           .then(res => {
               this.setState({message : 'Produto deletado com sucesso.'});
               this.setState({produtos: this.state.produtos.filter(produto => produto.id !== produtoId)});
           })

    }

    editProduto(id) {
        window.localStorage.setItem("produtoId", id);
        this.props.history.push('/edit-produto');
    }

    addProduto() {
        window.localStorage.removeItem("produtoId");
        this.props.history.push('/add-produto');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Detalhes dos Produtos</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addProduto()}> Add Produto</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th className="hidden">Id</th> */}
                            <th>Descrição</th>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.produtos.map(
                              produto =>
                                    <tr key={produto.id}>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.titulo}</td>
                                        <td>{produto.preco}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteProduto(produto.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editProduto(produto.id)} style={{marginLeft: '20px'}}> Edit</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListProdutoComponent;
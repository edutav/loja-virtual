import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditProdutoComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            descricao: '',
            titulo: '',
            preco: '',
        }
        this.saveProduto = this.saveProduto.bind(this);
        this.loadProduto = this.loadProduto.bind(this);
    }

    componentDidMount() {
        this.loadProduto();
    }

    loadProduto() {
        ApiService.fetchProdutoById(window.localStorage.getItem("produtoId"))
            .then((res) => {
                let produto = res.data;
                this.setState({
                id: produto.id,
                descricao: produto.descricao,
                titulo: produto.titulo,
                preco: produto.preco,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveProduto = (e) => {
        e.preventDefault();
        let produto = {id: this.state.id, descricao: this.state.descricao, titulo: this.state.titulo, preco: this.state.preco};
        ApiService.editProduto(produto)
            .then(res => {                
                this.setState({message : 'Produto atualizado com sucesso.'});
                this.props.history.push('/produtos');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Produto</h2>
                <form>

                <div className="form-group">
                    <label>Titulo:</label>
                    <input type="text" placeholder="Titulo" name="titulo" className="form-control" value={this.state.titulo} onChange={this.onChange}/>
                </div>

                    <div className="form-group">
                        <label>Descrição:</label>
                        <input placeholder="Descrição" name="descricao" className="form-control" value={this.state.descricao} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Preço:</label>
                        <input type="number" placeholder="Preço" name="preco" className="form-control" value={this.state.preco} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveProduto}>Salvar</button>
                </form>
            </div>
        );
    }
}

export default EditProdutoComponent;
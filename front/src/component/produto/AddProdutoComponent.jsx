import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddProdutoComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            descricao: '',
            titulo: '',
            preco: '',
            message: null
        }
        this.saveProduto = this.saveProduto.bind(this);
    }

    saveProduto = (e) => {
        e.preventDefault();
        let produto = {descricao: this.state.descricao, titulo: this.state.titulo, preco: this.state.preco};
        ApiService.addProduto(produto)
            .then(res => {
                this.setState({message : 'Produto adicionado com sucesso.'});
                this.props.history.push('/produtos');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Produto</h2>
                <form>
                <div className="form-group">
                    <label>Titulo:</label>
                    <input type="text" placeholder="Titulo" name="titulo" className="form-control" value={this.state.titulo} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <input type="text" placeholder="Descrição" name="descricao" className="form-control" value={this.state.descricao} onChange={this.onChange}/>
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

export default AddProdutoComponent;
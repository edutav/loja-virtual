import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/produtos';

class ApiService {
	fetchProdutos() {
		return axios.get(API_BASE_URL);
	}

	fetchProdutoById(produtoId) {
		return axios.get(API_BASE_URL + '/' + produtoId);
	}

	deleteProduto(produtoId) {
		return axios.delete(API_BASE_URL + '/' + produtoId);
	}

	addProduto(produto) {
		return axios.post('' + API_BASE_URL, produto);
	}

	editProduto(produto) {
		return axios.put(API_BASE_URL + '/' + produto.id, produto);
	}
}

export default new ApiService();

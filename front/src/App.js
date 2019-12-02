import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListProdutoComponent from './component/produto/ListProdutoComponent';
import AddProdutoComponent from './component/produto/AddProdutoComponent';
import EditProdutoComponent from './component/produto/EditProdutoComponent';

function App() {
	return (
		<div className='container'>
			<Router>
				<div className='col-md-12'>
					<Switch>
						<Route path='/' exact component={ListProdutoComponent} />
						<Route path='/produtos' component={ListProdutoComponent} />
						<Route path='/add-produto' component={AddProdutoComponent} />
						<Route path='/edit-produto' component={EditProdutoComponent} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;

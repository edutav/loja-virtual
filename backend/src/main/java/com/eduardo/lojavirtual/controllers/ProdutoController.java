package com.eduardo.lojavirtual.controllers;

import com.eduardo.lojavirtual.model.Produto;
import com.eduardo.lojavirtual.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProdutoController {
	
	private ProdutoRepository produtoRepository;

	@Autowired
	public ProdutoController(ProdutoRepository produtoRepository) {
		this.produtoRepository = produtoRepository;
	}

	@GetMapping(value = "/produtos")
	public List buscarTodos() {
		return produtoRepository.findAll();
	}

	@GetMapping(value = {"/produtos/{id}"})
	public ResponseEntity findById(@PathVariable long id){
		return produtoRepository.findById(id)
			.map(record -> ResponseEntity.ok().body(record))
			.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping(value = "/produtos")
	public Produto create(@RequestBody Produto produto){
		return produtoRepository.save(produto);
	}

	@PutMapping(value="/produtos/{id}")
	public ResponseEntity update(@PathVariable("id") long id,
								 @RequestBody Produto produto) {
		return produtoRepository.findById(id)
			.map(record -> {
				record.setDescricao(produto.getDescricao());
				record.setTitulo(produto.getTitulo());
				record.setPreco(produto.getPreco());
				Produto updated = produtoRepository.save(record);
				return ResponseEntity.ok().body(updated);
			}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping(path ={"/produtos/{id}"})
	public ResponseEntity<?> delete(@PathVariable long id) {
		return produtoRepository.findById(id)
			.map(record -> {
				produtoRepository.deleteById(id);
				return ResponseEntity.ok().build();
			}).orElse(ResponseEntity.notFound().build());
	}
}

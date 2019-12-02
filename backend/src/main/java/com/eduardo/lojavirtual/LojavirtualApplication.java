package com.eduardo.lojavirtual;

import com.eduardo.lojavirtual.model.Produto;
import com.eduardo.lojavirtual.repositories.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;

@SpringBootApplication
public class LojavirtualApplication {

	public static void main(String[] args) {
		SpringApplication.run(LojavirtualApplication.class, args);
	}

	@Bean
	public CommandLineRunner init(ProdutoRepository repository){
		return args -> {
			Produto prod = new Produto();
			prod.setDescricao("Mesa com madeira MDF");
			prod.setTitulo("Mesa de 6 lugares");
			prod.setPreco(new BigDecimal(150.00));

			repository.save(prod);
		};
	}
}

package com.Team03.TVFM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@EnableJpaRepositories(basePackages = "com.Team03.TVFM.model")
@SpringBootApplication
public class TvfmApplication {

	public static void main(String[] args) {

		SpringApplication.run(TvfmApplication.class, args);
	}

}

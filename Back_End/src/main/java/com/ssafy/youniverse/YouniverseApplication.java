package com.ssafy.youniverse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class YouniverseApplication {

    public static void main(String[] args) {
        SpringApplication.run(YouniverseApplication.class, args);
    }

}

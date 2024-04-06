package com.soltel.elex.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MiConfiguracionCors implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Permite solicitudes desde cualquier origen para simplificar
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH") // Agregando PATCH también
                .allowedHeaders("*")
                .exposedHeaders("X-Auth-Token", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials") // Cabeceras que los clientes pueden necesitar leer
                .allowCredentials(true);
    }

    /*@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    } */
}

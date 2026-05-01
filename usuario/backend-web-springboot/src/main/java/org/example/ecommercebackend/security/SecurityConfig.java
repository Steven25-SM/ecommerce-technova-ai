package org.example.ecommercebackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Deshabilitamos CSRF porque usamos JWT (no cookies de sesión)
                .csrf(csrf -> csrf.disable())

                // Sin estado: Spring no guarda sesiones, cada request trae su token
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Definimos qué rutas son públicas y cuáles requieren token
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/usuarios/login").permitAll()   // login: público
                        .requestMatchers("/usuarios/registro").permitAll() // registro: público
                        .requestMatchers("/productos").permitAll()         // catálogo: público
                        .requestMatchers("/productos/filtrar").permitAll() // filtros: público
                        .anyRequest().authenticated()                      // todo lo demás: necesita token
                )

                // Agregamos nuestro filtro JWT antes del filtro de autenticación de Spring
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
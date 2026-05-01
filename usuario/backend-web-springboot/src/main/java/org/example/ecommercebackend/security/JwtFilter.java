package org.example.ecommercebackend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    // OncePerRequestFilter garantiza que este filtro corre exactamente una vez por request

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Buscamos el header "Authorization: Bearer <token>"
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extraemos solo el token (quitamos "Bearer ")
            String token = authHeader.substring(7);

            if (jwtUtil.validarToken(token)) {
                // Token válido: extraemos el correo y autenticamos al usuario en Spring Security
                String correo = jwtUtil.extraerCorreo(token);

                // Le decimos a Spring Security que este usuario está autenticado
                // List.of() = sin roles por ahora (los agregamos después si hace falta)
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(correo, null, List.of());

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Seguimos con el siguiente filtro o con el controller
        filterChain.doFilter(request, response);
    }
}
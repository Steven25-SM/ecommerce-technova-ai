package org.example.ecommercebackend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component // Spring lo maneja como un bean inyectable
public class JwtUtil {

    // Clave secreta con la que firmamos el token — mínimo 256 bits para HS256
    // En producción real esto iría en application.properties, no hardcodeado
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(
            "technova-clave-super-secreta-2024-abc123xyz".getBytes()
    );

    // El token dura 24 horas (en milisegundos)
    private final long EXPIRATION = 1000 * 60 * 60 * 24;

    // Genera el token con el correo del usuario como "subject"
    public String generarToken(String correo) {
        return Jwts.builder()
                .setSubject(correo)                          // quién es el usuario
                .setIssuedAt(new Date())                     // cuándo se creó
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION)) // cuándo expira
                .signWith(SECRET_KEY)                        // firmamos con nuestra clave
                .compact();                                  // lo convierte a String
    }

    // Extrae el correo del token (lo usaremos para saber quién hace cada request)
    public String extraerCorreo(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Valida que el token sea correcto y no haya expirado
    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            // Token inválido, expirado o manipulado
            return false;
        }
    }
}
package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Usuario;
import org.example.ecommercebackend.repository.UsuarioRepository;
import org.example.ecommercebackend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository repository;
    private final JwtUtil jwtUtil;

    public UsuarioController(UsuarioRepository repository, JwtUtil jwtUtil) {
        this.repository = repository;
        this.jwtUtil = jwtUtil;
    }

    // POST /usuarios/registro
    // Recibe todos los datos del formulario y guarda el usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        // Verificamos que el correo no esté ya registrado
        if (repository.findByCorreo(usuario.getCorreo()) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "El correo ya está registrado"));
        }

        // Asignamos rol CLIENTE por defecto
        usuario.setRol("CLIENTE");

        // ⚠️ En producción deberías encriptar la password con BCrypt
        // Por ahora la guardamos tal cual para mantenerlo simple
        Usuario guardado = repository.save(usuario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "mensaje", "Usuario registrado correctamente",
                        "id", guardado.getId(),
                        "nombre", guardado.getNombre()
                ));
    }

    // POST /usuarios/login
    // Recibe correo + password, devuelve JWT si son correctos
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String correo = body.get("correo");
        String password = body.get("password");

        Usuario encontrado = repository.findByCorreo(correo);

        // Si no existe o la password no coincide → error 401
        if (encontrado == null || !encontrado.getPassword().equals(password)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciales incorrectas"));
        }

        // Generamos el token con el correo del usuario
        String token = jwtUtil.generarToken(encontrado.getCorreo());

        // Devolvemos el token + datos básicos del usuario
        return ResponseEntity.ok(Map.of(
                "token", token,
                "nombre", encontrado.getNombre(),
                "rol", encontrado.getRol(),
                "id", encontrado.getId()
        ));
    }
}
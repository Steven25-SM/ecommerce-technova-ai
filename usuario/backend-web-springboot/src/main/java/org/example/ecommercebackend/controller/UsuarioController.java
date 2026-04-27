package org.example.ecommercebackend.controller;

import org.example.ecommercebackend.model.Usuario;
import org.example.ecommercebackend.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Usuario registrar(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        Usuario encontrado = repository.findByCorreo(usuario.getCorreo());

        if (encontrado != null &&
                encontrado.getPassword().equals(usuario.getPassword())) {
            return "Login correcto " + encontrado.getNombre();
        }

        return "Credenciales incorrectas";
    }
}
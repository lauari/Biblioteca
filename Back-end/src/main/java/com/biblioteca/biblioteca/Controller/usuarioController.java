package com.biblioteca.biblioteca.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.biblioteca.interfaceService.iusuarioService;
import com.biblioteca.biblioteca.models.usuario;


@RestController
@RequestMapping("/api/v1/usuario")
public class usuarioController {

    @Autowired
    private iusuarioService usuarioService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@ModelAttribute("usuario") usuario usuario) {

        
        if (usuario.getNombre().equals("")) {

            return new ResponseEntity<>("El nombre del usuario es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (usuario.getDireccion().equals("")) {

            return new ResponseEntity<>("La direccion del usuario es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (usuario.getCorreo().equals("")) {

            return new ResponseEntity<>("El correo del usuario es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (usuario.getTipoUsuario().equals("")) {

            return new ResponseEntity<>("El tipo de usuario es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        usuarioService.save(usuario);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var usuario = usuarioService.findAll();
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var usuario = usuarioService.findOne(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        usuarioService.delete(id);
        return new ResponseEntity<>("Registro eliminado", HttpStatus.OK);
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("usuario") usuario usuarioUpdate){
        var usuario = usuarioService.findOne(id).get();

        if (usuario != null) {
            
            usuario.setNombre(usuarioUpdate.getNombre());
            usuario.setDireccion(usuarioUpdate.getDireccion());
            usuario.setCorreo(usuarioUpdate.getCorreo());
            usuario.setTipoUsuario(usuarioUpdate.getTipoUsuario());
          
            usuarioService.save(usuario);

            return new ResponseEntity<>(usuario, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Error libro No encontrado", HttpStatus.BAD_REQUEST);
        }
    }

}

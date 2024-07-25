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

import com.biblioteca.biblioteca.interfaceService.ilibroService;
import com.biblioteca.biblioteca.models.libro;


@RestController
@RequestMapping("/api/v1/libro")
public class libroController {
    
    @Autowired
    private ilibroService libroService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@ModelAttribute("libro") libro libro) {

        
        if (libro.getTitulo().equals("")) {

            return new ResponseEntity<>("El titulo del libro es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (libro.getAutor().equals("")) {

            return new ResponseEntity<>("El autor del libro es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (libro.getGenero().equals("")) {

            return new ResponseEntity<>("El genero del libro es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        libroService.save(libro);
        return new ResponseEntity<>(libro, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var Libro =libroService.findAll();
        return new ResponseEntity<>(Libro, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var libro = libroService.findOne(id);
        return new ResponseEntity<>(libro, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        libroService.delete(id);
        return new ResponseEntity<>("Registro eliminado", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("libro") libro libroUpdate){
        var libro= libroService.findOne(id).get();

        if (libro != null) {
            
            libro.setTitulo(libroUpdate.getTitulo());
            libro.setAutor(libroUpdate.getAutor());
            libro.setISBN(libroUpdate.getISBN());
            libro.setGenero(libroUpdate.getGenero());
            libro.setNumEjemdisponibles(libroUpdate.getNumEjemdisponibles());
            libro.setNumEjemocupados(libroUpdate.getNumEjemocupados());

            libroService.save(libro);

            return new ResponseEntity<>(libro, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Error libro No encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}

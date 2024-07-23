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

import com.biblioteca.biblioteca.interfaceService.iprestamoService;
import com.biblioteca.biblioteca.models.prestamo;


@RestController
@RequestMapping("/api/v1/prestamo")
public class prestamoController {

    @Autowired
    private iprestamoService prestamoService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@ModelAttribute("prestamo") prestamo prestamo) {

        
        if (prestamo.getFechaPrestamo().equals("")) {

            return new ResponseEntity<>(" es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getFechaDevolucion().equals("")) {

            return new ResponseEntity<>("es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getUsuarioPrestamo().equals("")) {

            return new ResponseEntity<>("es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getLibroPrestado().equals("")) {

            return new ResponseEntity<>("es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (prestamo.getEstado().equals("")) {

            return new ResponseEntity<>("es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        prestamoService.save(prestamo);
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }
    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var prestamo = prestamoService.findAll();
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var prestamo = prestamoService.findOne(id);
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        prestamoService.delete(id);
        return new ResponseEntity<>("Registro eliminado", HttpStatus.OK);
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("prestamo") prestamo prestamoUpdate){
        var prestamo = prestamoService.findOne(id).get();

        if (prestamo != null) {
            
            prestamo.setFechaPrestamo(prestamoUpdate.getFechaPrestamo());
            prestamo.setFechaDevolucion(prestamoUpdate.getFechaDevolucion());
            prestamo.setUsuarioPrestamo(prestamoUpdate.getUsuarioPrestamo());
            prestamo.setLibroPrestado(prestamoUpdate.getLibroPrestado());
            prestamo.setEstado(prestamoUpdate.getEstado());
          
            prestamoService.save(prestamo);

            return new ResponseEntity<>(prestamo, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Error prestamo No encontrado", HttpStatus.BAD_REQUEST);
        }
    }


}

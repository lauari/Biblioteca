package com.biblioteca.biblioteca.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.biblioteca.models.libro;

@Repository
public interface ilibro extends CrudRepository<libro, String>{

    @Query("SELECT l FROM libro l WHERE l.titulo = ?1 OR l.autor = ?2 OR l.genero = ?3")
    List<libro> libroExist(String titulo, String autor, String genero);
}



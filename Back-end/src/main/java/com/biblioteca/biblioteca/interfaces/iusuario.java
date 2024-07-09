package com.biblioteca.biblioteca.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.biblioteca.models.usuario;

@Repository
public interface iusuario extends CrudRepository<usuario, String>{

     @Query("SELECT u FROM usuario u WHERE u.nombre = ?1 OR u.correo = ?2")
    List<usuario> usuarioExist(String nombre, String correo);

}

package com.biblioteca.biblioteca.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.biblioteca.models.prestamo;

@Repository
public interface iprestamo extends CrudRepository<prestamo, String>{

     @Query("SELECT p FROM prestamo p WHERE p.estado = ?1")
    List<prestamo> prestamoExist(String estado);

}

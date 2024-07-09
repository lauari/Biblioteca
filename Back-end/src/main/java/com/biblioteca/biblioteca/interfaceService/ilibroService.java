
package com.biblioteca.biblioteca.interfaceService;

import java.util.List;
import java.util.Optional;

import com.biblioteca.biblioteca.models.libro;

public interface ilibroService {

    public String save(libro libro);    
    public List<libro> findAll();
    public Optional<libro> findOne(String id);
    public int delete(String id);
    public List<libro> filtroLibros(String filtro);
    public Object findById(String id);

}
package com.biblioteca.biblioteca.interfaceService;

import java.util.List;
import java.util.Optional;
import com.biblioteca.biblioteca.models.prestamo;


public interface iprestamoService {

     public String save(prestamo prestamo);

    public List<prestamo> findAll();

    public List<prestamo> prestamoExist(String estado);

    public Optional<prestamo> findOne(String id);

    //cambiar el int
    public int delete(String id);

    public List<prestamo> filtropPrestamos(String filtro);

    public Object findById(String id);

}

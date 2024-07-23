package com.biblioteca.biblioteca.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.interfaceService.iprestamoService;
import com.biblioteca.biblioteca.interfaces.iprestamo;
import com.biblioteca.biblioteca.models.prestamo;


@Service
public class prestamoService implements iprestamoService{

     @Autowired
    private iprestamo data;

    
    @Override
    public String save(prestamo prestamo) {
        data.save(prestamo);
        return prestamo.getIdPrestamo();
    }

    @Override
    public List<prestamo> findAll(){
        List<prestamo> listaprestamo = (List<prestamo>) data.findAll();
        return listaprestamo;
    }

    @Override
    public Optional<prestamo> findOne(String id){
        Optional<prestamo> prestamo = data.findById(id);
        return prestamo;
    }

    
    @Override
    public List<prestamo> prestamoExist(String estado, String UsuarioPrestamo) {
            List<prestamo> listaprestamo =data.prestamoExist(estado, UsuarioPrestamo);
            return listaprestamo;
    }

    @Override
    public int delete(String id) {
        data.deleteById(id);
        return 1;
    }

    @Override
    public Object findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<prestamo> filtropPrestamos(String filtro) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'filtropPrestamos'");
    }



}

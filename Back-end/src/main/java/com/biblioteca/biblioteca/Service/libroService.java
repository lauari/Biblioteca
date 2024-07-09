


package com.biblioteca.biblioteca.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.interfaceService.ilibroService;
import com.biblioteca.biblioteca.interfaces.ilibro;
import com.biblioteca.biblioteca.models.libro;

@Service
public class libroService implements ilibroService {

     @Autowired
    private ilibro data;

    
    @Override
    public String save(libro libro) {
        data.save(libro);
        return libro.getIdLibro();
    }

    @Override
    public List<libro> findAll(){
        List<libro> listalibro = (List<libro>) data.findAll();
        return listalibro;
    }

    @Override
    public Optional<libro> findOne(String id){
        Optional<libro> libro = data.findById(id);
        return libro;
    }


    @Override
    public int delete(String id) {
        data.deleteById(id);
        return 1;
    }

    @Override
    public List<libro> filtroLibros(String filtro) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'filtroLibros'");
    }

    @Override
    public Object findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

  
}









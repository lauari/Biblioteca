package com.biblioteca.biblioteca.Service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca.interfaceService.iusuarioService;
import com.biblioteca.biblioteca.interfaces.iusuario;
import com.biblioteca.biblioteca.models.usuario;

@Service
public class usuarioService implements iusuarioService {

    @Autowired
    private iusuario data;

    
    @Override
    public String save(usuario usuario) {
        data.save(usuario);
        return usuario.getIdUsuario();
    }

    @Override
    public List<usuario> findAll(){
        List<usuario> listauUsuario = (List<usuario>) data.findAll();
        return listauUsuario;
    }

    @Override
    public Optional<usuario> findOne(String id){
        Optional<usuario> usuario = data.findById(id);
        return usuario;
    }

    
    @Override
    public List<usuario> usuarioExist(String nombre, String correo) {
            List<usuario> listaUsuario =data.usuarioExist(nombre, correo);
            return listaUsuario;
    }

    @Override
    public int delete(String id) {
        data.deleteById(id);
        return 1;
    }

     @Override
    public List<usuario> filtroUsuarios(String filtro) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'filtroLibros'");
    }

    @Override
    public Object findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }


}

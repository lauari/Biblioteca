package com.biblioteca.biblioteca.interfaceService;

import java.util.List;
import java.util.Optional;
import com.biblioteca.biblioteca.models.usuario;

public interface iusuarioService {

    public String save(usuario usuario);

    public List<usuario> findAll();

    public List<usuario> usuarioExist(String nombre, String correo);

    public Optional<usuario> findOne(String id);

    //cambiar el int
    public int delete(String id);

    public List<usuario> filtroUsuarios(String filtro);

    public Object findById(String id);
}

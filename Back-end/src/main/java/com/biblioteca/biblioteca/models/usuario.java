package com.biblioteca.biblioteca.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "usuario")
public class usuario {
    /*
     * Nombre
       Dirección
       Correo electrónico
       Tipo de usuario
            1.lector
            2.bibliotecario
            3.administrador
     */

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idUsuario", nullable = false, length = 36)
    private String idUsuario;

    @Column(name = "nombre", nullable = false, length = 36)
    private String nombre;

    @Column(name = "direccion", nullable = false, length = 36)
    private String direccion;

    @Column(name = "correo", nullable = false, length = 36)
    private String correo;

    @Column(name = "tipoUsuario", nullable = false, length = 36)
    private String tipoUsuario;

    public usuario() {
    }

    public usuario(String idUsuario, String nombre, String direccion, String correo, String tipoUsuario) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.direccion = direccion;
        this.correo = correo;
        this.tipoUsuario = tipoUsuario;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    


}

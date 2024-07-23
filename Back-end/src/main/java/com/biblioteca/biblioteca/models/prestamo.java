package com.biblioteca.biblioteca.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "prestamo")
public class prestamo {
    /*
     * Fecha de préstamo
     * Fecha de devolución
     * Usuario que realiza el préstamo
     * Libro prestado
     * Estado
         1.Préstamo
         2.Entregado
         3.Cancelado
     */

     @Id
     @GeneratedValue(strategy = GenerationType.UUID)
     @Column(name = "idPrestamo", nullable = false, length = 36)
     private String idPrestamo;

     @Column(name = "fechaPrestamo", nullable = false, length = 36)
     private Date fechaPrestamo;

     @Column(name = "fechaDevolucion", nullable = false, length = 36)
     private Date fechaDevolucion;

     @Column(name = "UsuarioPrestamo", nullable = false, length = 36)
     private String UsuarioPrestamo;

     @Column(name = "libroPrestado", nullable = false, length = 36)
     private String libroPrestado;

     @Column(name = "estado", nullable = false, length = 36)
     private String estado;

     @ManyToOne
     @JoinColumn(name = "idUsuario")
     private usuario usuario;

     @ManyToOne
     @JoinColumn(name = "idLibro")
     private libro libro;

    public prestamo() {
    }

    public prestamo(String idPrestamo, Date fechaPrestamo, Date fechaDevolucion, String usuarioPrestamo,
            String libroPrestado, String estado, com.biblioteca.biblioteca.models.usuario usuario,
            com.biblioteca.biblioteca.models.libro libro) {
        this.idPrestamo = idPrestamo;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        UsuarioPrestamo = usuarioPrestamo;
        this.libroPrestado = libroPrestado;
        this.estado = estado;
        this.usuario = usuario;
        this.libro = libro;
    }

    public String getIdPrestamo() {
        return idPrestamo;
    }

    public void setIdPrestamo(String idPrestamo) {
        this.idPrestamo = idPrestamo;
    }

    public Date getFechaPrestamo() {
        return fechaPrestamo;
    }

    public void setFechaPrestamo(Date fechaPrestamo) {
        this.fechaPrestamo = fechaPrestamo;
    }

    public Date getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(Date fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public String getUsuarioPrestamo() {
        return UsuarioPrestamo;
    }

    public void setUsuarioPrestamo(String usuarioPrestamo) {
        UsuarioPrestamo = usuarioPrestamo;
    }

    public String getLibroPrestado() {
        return libroPrestado;
    }

    public void setLibroPrestado(String libroPrestado) {
        this.libroPrestado = libroPrestado;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(usuario usuario) {
        this.usuario = usuario;
    }

    public libro getLibro() {
        return libro;
    }

    public void setLibro(libro libro) {
        this.libro = libro;
    }
}

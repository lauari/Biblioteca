package com.biblioteca.biblioteca.models;

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
     private String fechaPrestamo;

     @Column(name = "fechaDevolucion", nullable = false, length = 36)
     private String fechaDevolucion;

     @Column(name = "estado", nullable = false, length = 36)
     private String estado;

     @ManyToOne
     @JoinColumn(name = "usuario")
     private usuario usuario;

     @ManyToOne
     @JoinColumn(name = "libro")
     private libro libro;

    public prestamo() {
    }

    public prestamo(String idPrestamo, String fechaPrestamo, String fechaDevolucion, String estado,
            com.biblioteca.biblioteca.models.usuario usuario, com.biblioteca.biblioteca.models.libro libro) {
        this.idPrestamo = idPrestamo;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
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

    public String getFechaPrestamo() {
        return fechaPrestamo;
    }

    public void setFechaPrestamo(String fechaPrestamo) {
        this.fechaPrestamo = fechaPrestamo;
    }

    public String getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(String fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
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

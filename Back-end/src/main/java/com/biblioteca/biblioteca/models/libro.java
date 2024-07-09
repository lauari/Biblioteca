package com.biblioteca.biblioteca.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "libro")
public class libro {
    
    /*
    id
    Título
    Autor
    ISBN
    Género
    Número de ejemplares disponibles
    Número de ejemplares ocupados
     */

     @Id
     @GeneratedValue(strategy = GenerationType.UUID)
     @Column(name = "idLibro", nullable = false, length = 36)
     private String idLibro;

     @Column(name = "titulo", nullable = false, length = 36)
     private String titulo;

     @Column(name = "autor", nullable = false, length = 36)
     private String autor;

     @Column(name = "ISBN", nullable = false, length = 36)
     private String ISBN;

     @Column(name = "genero", nullable = false, length = 36)
     private String genero;

     @Column(name = "numEjemdisponibles", nullable = false, length = 36)
     private int numEjemdisponibles;

     @Column(name = "numEjemocupados", nullable = false, length = 36)
     private int numEjemocupados;

    public libro() {
    }

    public libro(String idLibro, String titulo, String autor, String iSBN, String genero, int numEjemdisponibles,
            int numEjemocupados) {
        this.idLibro = idLibro;
        this.titulo = titulo;
        this.autor = autor;
        ISBN = iSBN;
        this.genero = genero;
        this.numEjemdisponibles = numEjemdisponibles;
        this.numEjemocupados = numEjemocupados;
    }

    public String getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(String idLibro) {
        this.idLibro = idLibro;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String iSBN) {
        ISBN = iSBN;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public int getNumEjemdisponibles() {
        return numEjemdisponibles;
    }

    public void setNumEjemdisponibles(int numEjemdisponibles) {
        this.numEjemdisponibles = numEjemdisponibles;
    }

    public int getNumEjemocupados() {
        return numEjemocupados;
    }

    public void setNumEjemocupados(int numEjemocupados) {
        this.numEjemocupados = numEjemocupados;
    }

  

    
}

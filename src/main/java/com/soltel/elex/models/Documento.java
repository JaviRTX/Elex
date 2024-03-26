package com.soltel.elex.models;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "documentos")
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255)
    private String ruta;

    @Column(nullable = false, precision = 6, scale = 2)
    private BigDecimal tasa;

    @Column(nullable = false)
    private int expediente;

    // Constructor vacío
    public Documento() { }

    // Constructor con parámetros
    public Documento(int id, String ruta, BigDecimal tasa, int expediente) {
        this.id = id;
        this.ruta = ruta;
        this.tasa = tasa;
        this.expediente = expediente;
    }

    // Getters y setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public BigDecimal getTasa() {
        return tasa;
    }

    public void setTasa(BigDecimal tasa) {
        this.tasa = tasa;
    }

    public int getExpediente() {
        return expediente;
    }

    public void setExpediente(int expediente) {
        this.expediente = expediente;
    }

    // Métodos adicionales según sean necesarios
    // ...
}

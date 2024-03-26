package com.soltel.elex.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "actuaciones")
public class Actuacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255)
    private String descripcion;

    @Column(nullable = false)
    private boolean finalizado;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;

    // Asumiendo que hay una relación con la tabla expedientes
    @Column(nullable = false)
    private int expediente;

    // Constructores
    public Actuacion() {}

    public Actuacion(int id, String descripcion, boolean finalizado, Date fecha, int expediente) {
        this.id = id;
        this.descripcion = descripcion;
        this.finalizado = finalizado;
        this.fecha = fecha;
        this.expediente = expediente;
    }

    // Getters y setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isFinalizado() {
        return finalizado;
    }

    public void setFinalizado(boolean finalizado) {
        this.finalizado = finalizado;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
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

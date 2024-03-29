package com.soltel.elex.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "expedientes")
public class Expediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 50)
    private String codigo;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date fecha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;

    @Column(length = 70)
    private String opciones;

    @Column(nullable = false, length = 255)
    private String descripcion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo", nullable = false)
    private TiposExpedienteModel tipoExpediente;

    // Enumeración para el estado
    public enum Estado {
        PENDIENTE, ENVIADO, ERRONEO
    }

    // Constructores, Getters y Setters

    // Constructor vacío
    public Expediente() {}

    // Constructor con parámetros
    public Expediente(Long id, String codigo, Date fecha, Estado estado, String opciones, String descripcion, TiposExpedienteModel tipoExpediente) {
        this.id = id;
        this.codigo = codigo;
        this.fecha = fecha;
        this.estado = estado;
        this.opciones = opciones;
        this.descripcion = descripcion;
        this.tipoExpediente = tipoExpediente;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public String getOpciones() {
        return opciones;
    }

    public void setOpciones(String opciones) {
        this.opciones = opciones;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public TiposExpedienteModel getTipoExpediente() {
        return tipoExpediente;
    }

    public void setTipoExpediente(TiposExpedienteModel tipoExpediente) {
        this.tipoExpediente = tipoExpediente;
    }

    // Métodos adicionales y lógica de negocio si es necesario
}
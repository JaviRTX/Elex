package com.soltel.elex.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "expedientes")
public class Expediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String codigo;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;

    @Column(length = 70)
    private String opciones;

    @Column(length = 255, nullable = false)
    private String descripcion;

    // Asumiendo que hay una relación con la tabla tipos_expediente
    @Column(nullable = false)
    private int tipo;

    // Constructores
    public Expediente() {}

    public Expediente(Long id, String codigo, Date fecha, Estado estado, String opciones, String descripcion, int tipo) {
        this.id = id;
        this.codigo = codigo;
        this.fecha = fecha;
        this.estado = estado;
        this.opciones = opciones;
        this.descripcion = descripcion;
        this.tipo = tipo;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }

    public String getOpciones() { return opciones; }
    public void setOpciones(String opciones) { this.opciones = opciones; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    // Enum para el estado
    public enum Estado {
        PENDIENTE,
        ENVIADO,
        ERRONEO
    }

    // Métodos para la relación con otras tablas (si existen)
    // ...
}

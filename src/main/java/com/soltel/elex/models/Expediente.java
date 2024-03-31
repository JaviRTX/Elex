package com.soltel.elex.models;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import java.util.Date;


@ApiModel(description = "Representa un expediente en el sistema")
@Entity
@Table(name = "expedientes")
public class Expediente {

    @ApiModelProperty(notes = "El ID del expediente", example = "1", required = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ApiModelProperty(notes = "Código único del expediente", example = "EXP001", required = true)
    @Column(unique = true, nullable = false, length = 50)
    private String codigo;

    @ApiModelProperty(notes = "Fecha del expediente", required = true)
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @ApiModelProperty(notes = "Estado actual del expediente", required = true)
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('Pendiente', 'Enviado', 'Erróneo')")
    private EstadoExpediente estado;

    @ApiModelProperty(notes = "Opciones adicionales del expediente", example = "Opcion1, Opcion2")
    @Column(length = 70)
    private String opciones;

    @ApiModelProperty(notes = "Descripción detallada del expediente", example = "Descripción del expediente", required = true)
    @Column(nullable = false, length = 255)
    private String descripcion;

    @ApiModelProperty(notes = "Tipo del expediente", example = "1", required = true)
    @Column(nullable = false)
    private Byte tipo;

    @ApiModelProperty(notes = "Indica si el expediente está activo o no", example = "true", required = true)
    @Column(nullable = false)
    private Boolean activo;

    // Getters, Setters, y posiblemente Constructores aquí

    public enum EstadoExpediente {
        Pendiente, Enviado, Erróneo
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public EstadoExpediente getEstado() {
        return estado;
    }

    public void setEstado(EstadoExpediente estado) {
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

    public Byte getTipo() {
        return tipo;
    }

    public void setTipo(Byte tipo) {
        this.tipo = tipo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}

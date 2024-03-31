package com.soltel.elex.controllers;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.models.Documento;
import com.soltel.elex.models.Expediente;
import com.soltel.elex.models.Expediente.EstadoExpediente;
import com.soltel.elex.services.ActuacionService;
import com.soltel.elex.services.DocumentoService;
import com.soltel.elex.services.ExpedienteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expedientes")
@Api(value = "Gestión de Expedientes")
public class ExpedienteController {

    @Autowired
    private ExpedienteService expedienteService;

    @Autowired
    private ActuacionService actuacionService;

    @Autowired
    private DocumentoService documentoService;

    @PostMapping
@ApiOperation(value = "Crear un nuevo expediente con actuación", response = Expediente.class)
public Expediente createExpedienteConActuacion(
        @RequestParam String codigo,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
        @RequestParam EstadoExpediente estado,
        @RequestParam(required = false) String opciones,
        @RequestParam String descripcion,
        @RequestParam Byte tipo,
        @RequestParam Boolean activo,
        @RequestParam String descripcionActuacion,
        @RequestParam Boolean finalizadoActuacion,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaActuacion,
        @RequestParam String rutaDocumento,
        @RequestParam Double tasaDocumento) {

    // Crear y guardar el Expediente
    Expediente nuevoExpediente = new Expediente();
    nuevoExpediente.setCodigo(codigo);
    nuevoExpediente.setFecha(java.sql.Date.valueOf(fecha)); 
    nuevoExpediente.setEstado(estado);
    nuevoExpediente.setOpciones(opciones);
    nuevoExpediente.setDescripcion(descripcion);
    nuevoExpediente.setTipo(tipo);
    nuevoExpediente.setActivo(activo);

    nuevoExpediente = expedienteService.saveExpediente(nuevoExpediente);

    // Crear y guardar la Actuacion, asociada al Expediente
    Actuacion nuevaActuacion = new Actuacion();
    nuevaActuacion.setDescripcion(descripcionActuacion);
    nuevaActuacion.setFinalizado(finalizadoActuacion);
    if (fechaActuacion != null) {
        nuevaActuacion.setFecha(java.sql.Date.valueOf(fechaActuacion));
    }
    nuevaActuacion.setExpediente(nuevoExpediente);
    nuevaActuacion.setActivo(true);

    actuacionService.saveActuacion(nuevaActuacion);

    // Crear y guardar el Documento, asociado al Expediente
    Documento nuevoDocumento = new Documento();
    nuevoDocumento.setRuta(rutaDocumento);
    nuevoDocumento.setTasa(BigDecimal.valueOf(tasaDocumento)); // Convertir Double a BigDecimal
    nuevoDocumento.setExpediente(nuevoExpediente);
    nuevoDocumento.setActivo(true);

    documentoService.saveDocumento(nuevoDocumento);

    return nuevoExpediente;
}

    @GetMapping("/{id}")
    @ApiOperation(value = "Obtener un expediente por ID", response = Expediente.class)
    public Expediente getExpedienteById(@ApiParam(value = "ID del expediente para buscar", required = true) @PathVariable int id) {
        return expedienteService.getExpedienteById(id).orElse(null);
    }

    @GetMapping
    @ApiOperation(value = "Obtener todos los expedientes", response = List.class)
    public List<Expediente> getAllExpedientes() {
        return expedienteService.getAllExpedientes();
    }

    @PutMapping
    @ApiOperation(value = "Actualizar un expediente", response = Expediente.class)
    public Expediente updateExpediente(@ApiParam(value = "Expediente actualizado", required = true) @RequestBody Expediente expediente) {
        return expedienteService.updateExpediente(expediente);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Eliminar un expediente")
    public void deleteExpediente(@ApiParam(value = "ID del expediente para eliminar", required = true) @PathVariable int id) {
        expedienteService.deleteExpediente(id);
    }
}

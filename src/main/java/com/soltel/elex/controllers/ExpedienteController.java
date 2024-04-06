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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expedientes/")
@Api(value = "Gestión de Expedientes")
public class ExpedienteController {

    @Autowired
    private ExpedienteService expedienteService;

    @Autowired
    private ActuacionService actuacionService;

    @Autowired
    private DocumentoService documentoService;

    @PostMapping("/insertar")
@ApiOperation(value = "Crear un nuevo expediente con actuación", response = Expediente.class)
public Expediente createExpedienteConActuacion(
        @RequestParam String codigo,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
        @RequestParam EstadoExpediente estado,
        @RequestParam(required = false) String opciones,
        @RequestParam String descripcion,
        @RequestParam Byte tipo,
        @RequestParam(defaultValue = "true") Boolean activo,
        @RequestParam String descripcionActuacion,
        @RequestParam(defaultValue = "false") Boolean finalizadoActuacion,
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
    public ResponseEntity<Expediente> getExpedienteById(@ApiParam(value = "ID del expediente para buscar", required = true) @PathVariable int id) {
        Optional<Expediente> expediente = expedienteService.getExpedienteById(id);
        if (expediente.isPresent()) {
            return ResponseEntity.ok(expediente.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/consultar")
    @ApiOperation(value = "Obtener expedientes", response = Expediente.class)
    public List<Expediente> getAllExpedientes() {
        return expedienteService.getAllExpedientes();
    }

    @PutMapping("/{id}/actualizar")
    @ApiOperation(value = "Actualizar un expediente", response = Expediente.class)
    public ResponseEntity<Expediente> updateExpediente(
            @PathVariable Integer id,
            @RequestParam String codigo,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
            @RequestParam EstadoExpediente estado,
            @RequestParam(required = false) String opciones,
            @RequestParam String descripcion,
            @RequestParam Byte tipo,
            @RequestParam Boolean activo) {

        Optional<Expediente> expedienteOpt = expedienteService.getExpedienteById(id);
        if (!expedienteOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Expediente expedienteActualizado = expedienteOpt.get();
        expedienteActualizado.setCodigo(codigo);
        expedienteActualizado.setFecha(java.sql.Date.valueOf(fecha));
        expedienteActualizado.setEstado(estado);
        expedienteActualizado.setOpciones(opciones);
        expedienteActualizado.setDescripcion(descripcion);
        expedienteActualizado.setTipo(tipo);
        expedienteActualizado.setActivo(activo);

        expedienteService.updateExpediente(expedienteActualizado);

        return ResponseEntity.ok(expedienteActualizado);
    }

    @DeleteMapping("/{id}/delete")
    @ApiOperation(value = "Eliminar un expediente")
    public void deleteExpediente(@ApiParam(value = "ID del expediente para eliminar", required = true) @PathVariable int id) {
        expedienteService.deleteExpediente(id);
    }

    @ApiOperation(value = "Borrar un expediente de forma lógica")
    @PutMapping("/borrar/{id}")
    public ResponseEntity<Expediente> borrarLogico(@PathVariable(value = "id") Integer expedienteId) {
        Expediente expediente = expedienteService.borrarLogico(expedienteId);
        return ResponseEntity.ok().body(expediente);
    }
    //ACTUACIONES
    @PutMapping("/{expedienteId}/actuaciones/{actuacionId}")
    @ApiOperation(value = "Actualizar una actuación de un expediente específico", response = Actuacion.class)
    public ResponseEntity<Actuacion> updateActuacionDeExpediente(
            @PathVariable Integer expedienteId,
            @PathVariable Integer actuacionId,
            @RequestParam String descripcion,
            @RequestParam Boolean finalizado,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

        Optional<Expediente> expedienteOpt = expedienteService.getExpedienteById(expedienteId);
        if (!expedienteOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Actuacion> actuacionOpt = actuacionService.getActuacionById(actuacionId);
        if (!actuacionOpt.isPresent() || !actuacionOpt.get().getExpediente().getId().equals(expedienteId)) {
            return ResponseEntity.notFound().build();
        }

        Actuacion actuacionActualizada = actuacionOpt.get();
        actuacionActualizada.setDescripcion(descripcion);
        actuacionActualizada.setFinalizado(finalizado);
        if (fecha != null) {
            actuacionActualizada.setFecha(java.sql.Date.valueOf(fecha));
        }

        actuacionService.updateActuacion(actuacionActualizada);

        return ResponseEntity.ok(actuacionActualizada);
    }

    @GetMapping("/id-por-codigo/{codigo}")
    @ApiOperation(value = "Obtener un expediente por su código", response = Expediente.class)
    public ResponseEntity<Expediente> getExpedienteByCodigo(@ApiParam(value = "Código del expediente para buscar", required = true) @PathVariable String codigo) {
        Optional<Expediente> expedienteOpt = expedienteService.getExpedienteByCodigo(codigo);
        if (expedienteOpt.isPresent()) {
            return ResponseEntity.ok(expedienteOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //DOCUMENTOS
    @GetMapping("/{id}/de-expendiente-por-actuaciones")
    @ApiOperation(value = "Obtener todas las actuaciones de un expediente específico", response = List.class)
    public ResponseEntity<List<Actuacion>> getActuacionesByExpedienteId(@PathVariable Integer id) {
        Optional<Expediente> expedienteOpt = expedienteService.getExpedienteById(id);
        if (!expedienteOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Expediente expediente = expedienteOpt.get();
        List<Actuacion> actuaciones = expediente.getActuaciones(); // Asegúrate de que existe el método getActuaciones() en la clase Expediente

        if (actuaciones.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(actuaciones);

    
    }

    @GetMapping("/{id}/de-expendiente-por-documentos")
    @ApiOperation(value = "Obtener todos los documentos de un expediente específico", response = List.class)
    public ResponseEntity<List<Documento>> getDocumentosByExpedienteId(@PathVariable Integer id) {
        Optional<Expediente> expedienteOpt = expedienteService.getExpedienteById(id);
        if (!expedienteOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Expediente expediente = expedienteOpt.get();
        List<Documento> documentos = expediente.getDocumentos(); // Asegúrate de que existe el método getDocumentos() en la clase Expediente

        if (documentos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(documentos);
    }

    @PutMapping("/{expedienteId}/documentos/{documentoId}")
@ApiOperation(value = "Actualizar un documento de un expediente específico", response = Documento.class)
public ResponseEntity<Documento> updateDocumentoDeExpediente(
        @PathVariable Integer expedienteId,
        @PathVariable Integer documentoId,
        @RequestParam String ruta,
        @RequestParam BigDecimal tasa) {

    Optional<Expediente> expedienteOpt = expedienteService.getExpedienteById(expedienteId);
    if (!expedienteOpt.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    Optional<Documento> documentoOpt = documentoService.getDocumentoById(documentoId);
    if (!documentoOpt.isPresent() || !documentoOpt.get().getExpediente().getId().equals(expedienteId)) {
        return ResponseEntity.notFound().build();
    }

    Documento documentoActualizado = documentoOpt.get();
    documentoActualizado.setRuta(ruta);
    documentoActualizado.setTasa(tasa);

    documentoService.updateDocumento(documentoActualizado);

    return ResponseEntity.ok(documentoActualizado);
}
    
}

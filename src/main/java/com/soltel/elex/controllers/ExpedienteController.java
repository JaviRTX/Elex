package com.soltel.elex.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.soltel.elex.models.Expediente;
import com.soltel.elex.services.ExpedienteService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.soltel.elex.models.Expediente;

@RestController
@RequestMapping("/expedientes")
public class ExpedienteController {
    @Autowired
    private ExpedienteService expedienteService;

    @GetMapping("/consultar")
    public List<Expediente> consultarTodos() {
        return expedienteService.consultarTodos();
    }

    @PostMapping("/insertar")
    public Expediente insertarExpediente(@RequestBody Expediente nuevoExpediente) {
        return expedienteService.insertarExpediente(nuevoExpediente);
    }
    
 
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarExpediente(@PathVariable Long id, @RequestBody Expediente datosExpediente) {
        return expedienteService.obtenerPorId(id)
                .map(expedienteExistente -> {
                    expedienteExistente.setCodigo(datosExpediente.getCodigo());
                    expedienteExistente.setFecha(datosExpediente.getFecha());
                    expedienteExistente.setEstado(datosExpediente.getEstado());
                    expedienteExistente.setOpciones(datosExpediente.getOpciones());
                    expedienteExistente.setDescripcion(datosExpediente.getDescripcion());
                    // ... setear el resto de campos ...
                    Expediente expedienteActualizado = expedienteService.actualizarExpediente(expedienteExistente);
                    return ResponseEntity.ok(expedienteActualizado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarExpediente(@PathVariable Long id) {
        return expedienteService.obtenerPorId(id)
                .map(expediente -> {
                    expedienteService.borrarExpediente(expediente.getId());
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

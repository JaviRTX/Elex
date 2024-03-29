package com.soltel.elex.controllers;

import com.soltel.elex.models.Expediente;
import com.soltel.elex.services.ExpedienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expedientes")
public class ExpedienteController {
    @Autowired
    private ExpedienteService expedienteService;

    @GetMapping("/consultar")
    public List<Expediente> consultarTodos() {
        return expedienteService.consultarTodos();
    }

    @PostMapping("/insertar/")
    public Expediente insertarExpediente(@RequestBody Expediente nuevoExpediente) {
        
        return expedienteService.insertarExpediente(nuevoExpediente);
    }
 
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarExpediente(@PathVariable Long id, @RequestBody Expediente expedienteActualizado) {
        return expedienteService.obtenerPorId(id)
                .map(expedienteExistente -> {
                    expedienteExistente.setCodigo(expedienteActualizado.getCodigo());
                    expedienteExistente.setFecha(expedienteActualizado.getFecha());
                    expedienteExistente.setEstado(expedienteActualizado.getEstado());
                    expedienteExistente.setOpciones(expedienteActualizado.getOpciones());
                    expedienteExistente.setDescripcion(expedienteActualizado.getDescripcion());
                    expedienteExistente.setTipoExpediente(expedienteActualizado.getTipoExpediente());
                    return expedienteService.actualizarExpediente(expedienteExistente);
                })
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarExpediente(@PathVariable Long id) {
        boolean resultado = expedienteService.borrarExpediente(id);
        if (resultado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
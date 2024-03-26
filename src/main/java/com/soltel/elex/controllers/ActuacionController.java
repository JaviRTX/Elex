package com.soltel.elex.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.services.ActuacionService;

@RestController
@RequestMapping("/actuaciones")
public class ActuacionController {
    @Autowired
    private ActuacionService actuacionService;

    @GetMapping("/consultar")
    public List<Actuacion> consultarTodas() {
        return actuacionService.consultarTodas();
    }

    @PostMapping("/insertar")
    public Actuacion insertarActuacion(@RequestBody Actuacion nuevaActuacion) {
        return actuacionService.insertarActuacion(nuevaActuacion);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarActuacion(@PathVariable int id, @RequestBody Actuacion datosActuacion) {
        Optional<Actuacion> actuacionExistente = actuacionService.obtenerPorId(id);
        if (actuacionExistente.isPresent()) {
            Actuacion actuacionActualizada = actuacionExistente.get();
            actuacionActualizada.setDescripcion(datosActuacion.getDescripcion());
            actuacionActualizada.setFinalizado(datosActuacion.isFinalizado());
            actuacionActualizada.setFecha(datosActuacion.getFecha());
            actuacionActualizada.setExpediente(datosActuacion.getExpediente());
            actuacionService.actualizarActuacion(actuacionActualizada);
            return ResponseEntity.ok(actuacionActualizada);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Actuación no encontrada");
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarActuacion(@PathVariable int id) {
        Optional<Actuacion> actuacion = actuacionService.obtenerPorId(id);
        return actuacion
                .map(act -> {
                    actuacionService.borrarActuacion(act.getId());
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

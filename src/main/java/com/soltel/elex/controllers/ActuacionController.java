package com.soltel.elex.controllers;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.services.ActuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.HttpStatus;
@RestController
@RequestMapping("/actuaciones")
public class ActuacionController {

    @Autowired
    private ActuacionService actuacionService;

    @GetMapping("/consultar")
    public List<Actuacion> getAllActuaciones() {
        return actuacionService.findAll();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Actuacion> editarActuacion(@PathVariable("id") Integer id, @RequestBody Actuacion actuacion) {
        Actuacion actuacionExistente = actuacionService.findById(id);
        
        if (actuacionExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        actuacionExistente.setDescripcion(actuacion.getDescripcion());
        actuacionExistente.setFinalizado(actuacion.getFinalizado());
        actuacionExistente.setFecha(actuacion.getFecha());
        // Si necesitas actualizar más campos, hazlo aquí

        Actuacion actuacionActualizada = actuacionService.save(actuacionExistente);
        return new ResponseEntity<>(actuacionActualizada, HttpStatus.OK);
    }

    @PutMapping("/{id}/eliminar")
    public ResponseEntity<Void> eliminarActuacion(@PathVariable("id") Integer id) {
        Actuacion actuacionExistente = actuacionService.findById(id);
        
        if (actuacionExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        actuacionExistente.setActivo(false); // Marcamos la actuación como inactiva

        actuacionService.save(actuacionExistente); // Guardamos la actuación actualizada

        return new ResponseEntity<>(HttpStatus.OK); // Respondemos con éxito sin contenido
    }
}
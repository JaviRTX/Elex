package com.soltel.elex.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.soltel.elex.models.Documento;
import com.soltel.elex.services.DocumentoService;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {
    @Autowired
    private DocumentoService documentoService;

    @GetMapping("/consultar")
    public List<Documento> consultarTodos() {
        return documentoService.consultarTodos();
    }

    @PostMapping("/insertar")
    public Documento insertarDocumento(@RequestBody Documento nuevoDocumento) {
        return documentoService.insertarDocumento(nuevoDocumento);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarDocumento(@PathVariable int id, @RequestBody Documento datosDocumento) {
        Optional<Documento> documentoExistente = documentoService.obtenerPorId(id);
        if (documentoExistente.isPresent()) {
            Documento documentoActualizado = documentoExistente.get();
            documentoActualizado.setRuta(datosDocumento.getRuta());
            documentoActualizado.setTasa(datosDocumento.getTasa());
            documentoActualizado.setExpediente(datosDocumento.getExpediente());
            documentoService.actualizarDocumento(documentoActualizado);
            return ResponseEntity.ok(documentoActualizado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento no encontrado");
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarDocumento(@PathVariable int id) {
        Optional<Documento> documento = documentoService.obtenerPorId(id);
        return documento
                .map(doc -> {
                    documentoService.borrarDocumento(doc.getId());
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

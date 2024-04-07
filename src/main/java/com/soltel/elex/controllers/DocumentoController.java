package com.soltel.elex.controllers;

import com.soltel.elex.models.Documento;
import com.soltel.elex.services.DocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.soltel.elex.repositories.DocumentoRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;
    @Autowired
    private DocumentoRepository documentoRepository;

    @GetMapping("/consultar")
    public List<Documento> getAllDocumentos() {
        return documentoService.findAll();
    }
   
    @PutMapping("/{id}/actualizar")
    public ResponseEntity<?> updateDocumento(@PathVariable Integer id, @RequestBody Documento updatedDocumento) {
        return documentoRepository.findById(id)
                .map(documento -> {
                    documento.setRuta(updatedDocumento.getRuta());
                    documento.setTasa(updatedDocumento.getTasa());
                    // Actualizar cualquier otro campo que desees
                    documentoRepository.save(documento);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/eliminar")
    public ResponseEntity<?> eliminarDocumento(@PathVariable("id") Integer id) {
        Optional<Documento> documentoOptional = documentoRepository.findById(id);
        if (documentoOptional.isPresent()) {
            Documento documento = documentoOptional.get();
            documento.setActivo(false); // Marcamos el documento como inactivo
            documentoRepository.save(documento);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
package com.soltel.elex.controllers;

import com.soltel.elex.models.Documento;
import com.soltel.elex.services.DocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;

    @GetMapping("/consultar")
    public List<Documento> getAllDocumentos() {
        return documentoService.findAll();
    }
   
}
package com.soltel.elex.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.soltel.elex.models.Documento;
import com.soltel.elex.repositories.DocumentoRepository;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepository;

    public Documento saveDocumento(Documento documento) {
        return documentoRepository.save(documento);
    }

    public Documento updateDocumento(Documento documento) {
        if(documento.getId() != null && documentoRepository.existsById(documento.getId())) {
            return documentoRepository.save(documento);
        } else {
            // Puedes lanzar una excepción personalizada o manejar el caso de un id no encontrado
            throw new RuntimeException("Documento no encontrado con id: " + documento.getId());
        }
    }
    
}


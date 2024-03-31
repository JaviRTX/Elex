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

    // Otros métodos según sea necesario
}

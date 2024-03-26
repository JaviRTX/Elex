package com.soltel.elex.services;

import com.soltel.elex.models.Documento;
import com.soltel.elex.repositories.DocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentoService {
    @Autowired
    private DocumentoRepository repository;

    public List<Documento> consultarTodos() {
        return repository.findAllByOrderByIdAsc();
    }

    public Documento insertarDocumento(Documento documento) {
        return repository.save(documento);
    }

    public Documento actualizarDocumento(Documento documento) {
        return repository.save(documento);
    }

    public void borrarDocumento(int id) {
        repository.deleteById(id);
    }

    public Optional<Documento> obtenerPorId(int id) {
        return repository.findById(id);
    }
}

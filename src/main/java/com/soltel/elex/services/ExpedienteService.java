package com.soltel.elex.services;

import com.soltel.elex.models.Expediente;
import com.soltel.elex.repositories.ExpedienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpedienteService {
    @Autowired
    private ExpedienteRepository repository;

    public List<Expediente> consultarTodos() {
        return repository.findAllByOrderByIdAsc();
    }

    public Expediente insertarExpediente(Expediente expediente) {
        return repository.save(expediente);
    }

    public Expediente actualizarExpediente(Expediente expediente) {
        return repository.save(expediente);
    }

    public void borrarExpediente(Long id) {
        repository.deleteById(id);
    }

    public Optional<Expediente> obtenerPorId(Long id) {
        return repository.findById(id);
    }
}

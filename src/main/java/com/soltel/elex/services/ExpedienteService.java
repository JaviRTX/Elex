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
    private ExpedienteRepository expedienteRepository;

    public Expediente saveExpediente(Expediente expediente) {
        return expedienteRepository.save(expediente);
    }

    public Optional<Expediente> getExpedienteById(int id) {
        return expedienteRepository.findById(id);
    }

    public List<Expediente> getAllExpedientes() {
        return expedienteRepository.findAll();
    }

    public void deleteExpediente(int id) {
        expedienteRepository.deleteById(id);
    }

    public Expediente updateExpediente(Expediente expediente) {
        return expedienteRepository.save(expediente);
    }
}

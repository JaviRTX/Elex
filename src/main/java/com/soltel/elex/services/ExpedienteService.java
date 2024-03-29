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

    public List<Expediente> consultarTodos() {
        return expedienteRepository.findAll();
    }

    public Expediente insertarExpediente(Expediente expediente) {
        return expedienteRepository.save(expediente);
    }

    public Expediente actualizarExpediente(Expediente expedienteExistente) {
        // Verificar que expedienteExistente no es null y luego guardar
        if (expedienteExistente != null) {
            return expedienteRepository.save(expedienteExistente);
        } else {
            throw new IllegalArgumentException("El expediente proporcionado es nulo");
        }
    }

    public boolean borrarExpediente(Long id) {
        if (expedienteRepository.existsById(id)) {
            expedienteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Expediente> obtenerPorId(Long id) {
        return expedienteRepository.findById(id);
    }
    
    // Otros métodos según sea necesario
}

package com.soltel.elex.services;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.repositories.ActuacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActuacionService {
    @Autowired
    private ActuacionRepository repository;

    public List<Actuacion> consultarTodas() {
        return repository.findAllByOrderByIdAsc();
    }

    public Actuacion insertarActuacion(Actuacion actuacion) {
        return repository.save(actuacion);
    }

    public Actuacion actualizarActuacion(Actuacion actuacion) {
        return repository.save(actuacion);
    }

    public void borrarActuacion(int id) {
        repository.deleteById(id);
    }

    public Optional<Actuacion> obtenerPorId(int id) {
        return repository.findById(id);
    }
}

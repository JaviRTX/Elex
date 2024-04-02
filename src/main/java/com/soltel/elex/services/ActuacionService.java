package com.soltel.elex.services;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.repositories.ActuacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
@Service
public class ActuacionService {

@Autowired
private ActuacionRepository actuacionRepository;

public Actuacion saveActuacion(Actuacion actuacion) {
    return actuacionRepository.save(actuacion);
}

public Actuacion updateActuacion(Actuacion actuacion) {
    if (actuacion.getId() != null && actuacionRepository.existsById(actuacion.getId())) {
        return actuacionRepository.save(actuacion);
    } else {
        // Puedes lanzar una excepción personalizada o manejar el caso de un id no encontrado
        throw new RuntimeException("Actuacion no encontrada con id: " + actuacion.getId());
    }
}

public Optional<Actuacion> getActuacionById(Integer id) {
    return actuacionRepository.findById(id);
}


public List<Actuacion> findAll() {
    return actuacionRepository.findAll();
}
}
// Otros métodos según sea necesario

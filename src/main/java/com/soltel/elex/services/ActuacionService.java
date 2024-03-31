package com.soltel.elex.services;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.repositories.ActuacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActuacionService {

    @Autowired
    private ActuacionRepository actuacionRepository;

    public Actuacion saveActuacion(Actuacion actuacion) {
        return actuacionRepository.save(actuacion);
    }

    // Otros métodos según sea necesario
}
package com.soltel.elex.repositories;

import com.soltel.elex.models.Actuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActuacionRepository extends JpaRepository<Actuacion, Integer> {
    // Métodos adicionales si se requieren
}

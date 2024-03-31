package com.soltel.elex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.soltel.elex.models.Actuacion;

public interface ActuacionRepository extends JpaRepository<Actuacion, Integer> {
    // Aquí puedes agregar métodos de consulta personalizados si son necesarios
}
package com.soltel.elex.repositories;

import com.soltel.elex.models.Expediente;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpedienteRepository extends JpaRepository<Expediente, Integer> {
    // Aquí puedes añadir métodos personalizados si es necesario
    Optional<Expediente> findByCodigo(String codigo);
}

package com.soltel.elex.repositories;

import com.soltel.elex.models.Expediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpedienteRepository extends JpaRepository<Expediente, Long> {

    // Este método obtiene todos los expedientes ordenados por ID
    List<Expediente> findAllByOrderByIdAsc();

    // Aquí puedes agregar más métodos de consulta personalizados si es necesario
    // Por ejemplo, buscar por estado
    List<Expediente> findByEstado(Expediente.Estado estado);

    // Otros métodos de consulta específicos para la entidad Expediente
    // ...
}

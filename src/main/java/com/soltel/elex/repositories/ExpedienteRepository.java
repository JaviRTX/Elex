package com.soltel.elex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.soltel.elex.models.Expediente;
import java.util.List;

@Repository
public interface ExpedienteRepository extends JpaRepository<Expediente, Long> {
	
	// Ordena los resultados por el campo 'id'
    List<Expediente> findAllByOrderByIdAsc();

    // Puedes agregar aquí métodos adicionales de consulta si los necesitas
    // Por ejemplo, buscar por estado
    List<Expediente> findByEstado(String estado);

    // Otros métodos de consulta específicos para la entidad Expediente
    // ...
}

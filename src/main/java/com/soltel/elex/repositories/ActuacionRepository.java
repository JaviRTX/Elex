package com.soltel.elex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.soltel.elex.models.Actuacion;
import java.util.List;

@Repository
public interface ActuacionRepository extends JpaRepository<Actuacion, Integer> {
	
	// Ordena los resultados por el campo 'id'
    List<Actuacion> findAllByOrderByIdAsc();

    // Aquí puedes añadir más métodos si necesitas realizar consultas específicas para Actuaciones
    // Por ejemplo, encontrar actuaciones por su estado de finalización
    List<Actuacion> findByFinalizado(boolean finalizado);

    // Otros métodos de consulta que puedan ser necesarios para la entidad Actuacion
    // ...
}

package com.soltel.elex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.soltel.elex.models.Documento;
import java.util.List;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Integer> {
	
	// Ordena los resultados por el campo 'id'
    List<Documento> findAllByOrderByIdAsc();

    // Aquí puedes añadir más métodos si necesitas realizar consultas específicas para Documentos
    // Por ejemplo, encontrar documentos por expediente
    List<Documento> findByExpediente(int expediente);

    // Otros métodos de consulta que puedan ser necesarios para la entidad Documento
    // ...
}

package com.soltel.elex.repositories;

import com.soltel.elex.models.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Integer> {
    // Aquí puedes agregar consultas personalizadas si lo necesitas
}

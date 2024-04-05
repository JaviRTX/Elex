package com.soltel.elex.services;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.models.Documento;
import com.soltel.elex.models.Expediente;
import com.soltel.elex.repositories.ActuacionRepository;
import com.soltel.elex.repositories.DocumentoRepository;
import com.soltel.elex.repositories.ExpedienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpedienteService {

    @Autowired
    private ExpedienteRepository expedienteRepository;
    @Autowired
    private ActuacionRepository actuacionRepository;
    @Autowired
    private DocumentoRepository documentoRepository;

    public Expediente saveExpediente(Expediente expediente) {
        return expedienteRepository.save(expediente);
    }

    public Optional<Expediente> getExpedienteById(int id) {
        return expedienteRepository.findById(id);
    }

    public List<Expediente> getAllExpedientes() {
        return expedienteRepository.findAll();
    }
    

    public void deleteExpediente(int id) {
        expedienteRepository.deleteById(id);
    }

    public Expediente updateExpediente(Expediente expediente) {
        // Actualizar el expediente
        Expediente expedienteActualizado = expedienteRepository.save(expediente);

        // Actualizar las actuaciones y documentos asociados
        if (expediente.getActuaciones() != null) {
            for (Actuacion actuacion : expediente.getActuaciones()) {
                actuacion.setExpediente(expedienteActualizado);
                actuacionRepository.save(actuacion);
            }
        }

        if (expediente.getDocumentos() != null) {
            for (Documento documento : expediente.getDocumentos()) {
                documento.setExpediente(expedienteActualizado);
                documentoRepository.save(documento);
            }
        }

        return expedienteActualizado;
    }

    public Optional<Expediente> getExpedienteByCodigo(String codigo) {
        return expedienteRepository.findByCodigo(codigo);
    }
}

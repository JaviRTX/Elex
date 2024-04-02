package com.soltel.elex.controllers;

import com.soltel.elex.models.Actuacion;
import com.soltel.elex.services.ActuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actuaciones")
public class ActuacionController {

    @Autowired
    private ActuacionService actuacionService;

    @GetMapping("/consultar")
    public List<Actuacion> getAllActuaciones() {
        return actuacionService.findAll();
    }
    
}
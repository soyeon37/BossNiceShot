package com.ssafy.domain.solution.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Tag(name = "Solution API")
@RestController
@RequestMapping("/api/solution")
//@CrossOrigin(origins = "*", methods = {RequestMethod.GET , RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SolutionController {
    @Operation(summary = "관절 감지", description = "관절 감지")
    @PostMapping("/detect")
    public ResponseEntity<String> detect() {
        try {
            ProcessBuilder pb = new ProcessBuilder("C:\\Users\\SSAFY\\AppData\\Local\\Programs\\Python\\Python311\\python",
                    System.getProperty("user.dir") + "\\src\\main\\resources\\python\\PoseDetection.py");
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "euc-kr"));
            String line = " ";
            String output = "";

            while(line != null) {
                output += line;
                line = reader.readLine();
                output += "\n";
            }

            return new ResponseEntity<String>(output, HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Sorry: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

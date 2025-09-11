package in.kratigour.foodiesapi.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.kratigour.foodiesapi.Service.FoodService;
import in.kratigour.foodiesapi.io.FoodRequest;
import in.kratigour.foodiesapi.io.FoodResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:5173") // update if needed
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FoodResponse> addFood(
            @RequestParam("food") String foodJson,
            @RequestParam("file") MultipartFile file) {

        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest foodRequest;

        try {
            foodRequest = objectMapper.readValue(foodJson, FoodRequest.class);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        }

        FoodResponse response = foodService.addfood(foodRequest, file);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<FoodResponse>> getAllFoods() {
        return ResponseEntity.ok(foodService.readFoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodResponse> getFood(@PathVariable String id) {
        return ResponseEntity.ok(foodService.readFood(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable String id) {
        foodService.deleteFood(id);
        return ResponseEntity.ok().build();
    }
}

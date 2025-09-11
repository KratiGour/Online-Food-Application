package in.kratigour.foodiesapi.controller;

import in.kratigour.foodiesapi.Service.UserService;
import in.kratigour.foodiesapi.io.UserRequest;
import in.kratigour.foodiesapi.io.UserResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED) // ✅ removed semicolon
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.registerUser(request);
    }
}

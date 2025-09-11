package in.kratigour.foodiesapi.controller;

import in.kratigour.foodiesapi.Service.AppUserDetailService;
import in.kratigour.foodiesapi.io.AuthenticationRequest;
import in.kratigour.foodiesapi.io.AuthenticationResponse;
import in.kratigour.foodiesapi.io.RegisterRequest;
import in.kratigour.foodiesapi.util.JWTUtil;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailService userDetailService;
    private final JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        try {
            System.out.println("AUTH: Login attempt: email=" + request.getEmail() + ", password='" + request.getPassword() + "'");

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword().trim())
            );

            UserDetails userDetails = userDetailService.loadUserByUsername(request.getEmail().trim());
            String jwtToken = jwtUtil.generateToken(userDetails);

            System.out.println("AUTH: Login SUCCESS for: " + request.getEmail());
            return ResponseEntity.ok(new AuthenticationResponse(request.getEmail(), jwtToken));
        } catch (BadCredentialsException e) {
            System.out.println("AUTH: Login FAIL (bad credentials): email=" + request.getEmail());
            e.printStackTrace();
            return ResponseEntity.status(403).body("Invalid email or password");
        } catch (Exception e) {
            System.out.println("AUTH: Login FAIL (internal error): email=" + request.getEmail());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            boolean created = userDetailService.registerUser(request);
            if (created) {
                return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
            } else {
                return ResponseEntity.badRequest().body("User with this email already exists");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }
}

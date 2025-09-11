package in.kratigour.foodiesapi.Service;

import in.kratigour.foodiesapi.io.RegisterRequest;
import in.kratigour.foodiesapi.repository.UserRepository;
import in.kratigour.foodiesapi.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email.trim())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        System.out.println("AUTH: Loaded user for email=" + user.getEmail() + ", hash=" + user.getPassword());
        return new User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))  // Add default role here
        );
    }

    public boolean registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            System.out.println("User already exists with email: " + request.getEmail());
            return false;
        }
        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        UserEntity saved = userRepository.save(user);

        System.out.println("User registered and saved in DB: " + saved);

        return saved.getId() != null;
    }
}

package in.kratigour.foodiesapi.Service;
import in.kratigour.foodiesapi.io.UserRequest;
import in.kratigour.foodiesapi.io.UserResponse;

public interface UserService {
 UserResponse registerUser(UserRequest request) ;
        String findByUserId();
    }


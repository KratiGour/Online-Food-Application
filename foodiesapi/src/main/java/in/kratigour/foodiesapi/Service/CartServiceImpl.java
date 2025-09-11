package in.kratigour.foodiesapi.Service;

import in.kratigour.foodiesapi.entity.CartEntity;
import in.kratigour.foodiesapi.entity.UserEntity;
import in.kratigour.foodiesapi.io.CartRequest;
import in.kratigour.foodiesapi.io.CartResponse;
import in.kratigour.foodiesapi.repository.CartRepository;
import in.kratigour.foodiesapi.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("User not authenticated");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getId();
    }

    @Override
    public CartResponse addToCart(CartRequest request) {
        String loggedInUserId = getCurrentUserId();

        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOptional.orElseGet(() ->
                new CartEntity(loggedInUserId, new HashMap<>())
        );

        Map<String, Integer> cartItems = cart.getItems();
        cartItems.put(request.getFoodId(), cartItems.getOrDefault(request.getFoodId(), 0) + 1);

        cart.setItems(cartItems);
        cart = cartRepository.save(cart);

        return convertToResponse(cart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = getCurrentUserId();

        CartEntity cart = cartRepository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(loggedInUserId, new HashMap<>()));

        return convertToResponse(cart);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = getCurrentUserId();

        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String loggedInUserId = getCurrentUserId();

        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Map<String, Integer> cartItems = entity.getItems();
        String foodId = cartRequest.getFoodId();

        if (cartItems.containsKey(foodId)) {
            int currentQty = cartItems.get(foodId);
            if (currentQty > 1) {
                cartItems.put(foodId, currentQty - 1);
            } else {
                cartItems.remove(foodId);
            }
            entity.setItems(cartItems);
            entity = cartRepository.save(entity);
        }
        return convertToResponse(entity);
    }

    private CartResponse convertToResponse(CartEntity cartEntity) {
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(cartEntity.getItems())
                .build();
    }
}

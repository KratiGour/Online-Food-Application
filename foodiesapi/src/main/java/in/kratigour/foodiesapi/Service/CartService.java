package in.kratigour.foodiesapi.Service;

import in.kratigour.foodiesapi.io.CartRequest;
import in.kratigour.foodiesapi.io.CartResponse;

public interface CartService {
    CartResponse addToCart(CartRequest request);
    CartResponse getCart();
    void clearCart();
    CartResponse removeFromCart(CartRequest request);
}

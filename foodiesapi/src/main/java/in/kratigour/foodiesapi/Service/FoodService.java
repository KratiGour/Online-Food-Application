package in.kratigour.foodiesapi.Service;

import org.springframework.web.multipart.MultipartFile;
import in.kratigour.foodiesapi.io.FoodRequest;
import in.kratigour.foodiesapi.io.FoodResponse;
import java.util.List;


public interface FoodService {
    String uploadFile(MultipartFile file);
    FoodResponse addfood(FoodRequest request, MultipartFile file);
    List<FoodResponse> readFoods();
   FoodResponse readFood(String id);
  boolean deleteFile(String filename);
void deleteFood(String id);
}

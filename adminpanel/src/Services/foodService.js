import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const addfood = async (foodData, image) => {
  const formData = new FormData();
  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  try {
    await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getFoodList = async {}=>{
 try {
      const response = await axios.get('http://localhost:8080/api/foods');
      if (response.status === 200) {
        setList(response.data);
      } else {
        toast.error('Error while reading the foods');
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
      toast.error('Error fetching foods');
    }
}
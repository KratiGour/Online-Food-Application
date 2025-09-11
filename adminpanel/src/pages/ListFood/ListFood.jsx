import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListFood.css';
import { toast } from 'react-toastify';

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/foods');
      console.log("Fetched data:", response.data); // ✅ Debug output
      if (response.status === 200) {
        setList(response.data);
      } else {
        toast.error('Error while reading the foods');
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
      toast.error('Error fetching foods');
    }
  };

  const removeFood = async (foodId) => {
    console.log("Trying to delete food ID:", foodId);
    try {
      const response = await axios.delete(`http://localhost:8080/api/foods/${foodId}`);
      if (response.status === 200) {
        toast.success('Food removed');
        fetchList(); // refresh list
      } else {
        toast.error('Error occurred while removing the food');
      }
    } catch (error) {
      console.error('Error deleting food:', error);
      toast.error('Failed to delete food');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-lg card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} alt={item.name} height={48} width={48} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>&#8377;{item.price}.00</td>
                <td
                  className="bi bi-x-circle-fill"
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => removeFood(item.id)}
                ></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;

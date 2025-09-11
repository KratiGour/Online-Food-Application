import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani'
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('food', JSON.stringify(data));
    formData.append('file', image);

    try {
      await axios.post('http://localhost:8080/api/foods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Food added successfully');
      setData({ name: '', description: '', category: 'Biryani', price: '' });
      setImage(null);

    } catch (error) {
      console.error(error);
      toast.error('Error adding food');
    }
  };

  return (
    <div className="mx-2 mt-top">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="Preview"
                    width={98}
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <input
                  type="file"
                  name="file"  
                  className="form-control"
                  id="image"
                  required
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  placeholder='Noodles'
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder='wright content here..'
                  id="description"
                  rows="5"
                  name="description"
                  required
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  <option value="">-- Select --</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="Ice Cream">Ice Cream</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder='&#8377;200'
                  id="price"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.price}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;

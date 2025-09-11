import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../Context/StoreContext.jsx';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { increaseQty } = useContext(StoreContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/foods/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error('Error displaying the food details');
      }
    };
    loadFoodDetails();
  }, [id]);

  const addToCart = () => {
    if (data?.id) {
      increaseQty(data.id);
      navigate('/cart');
    }
  };

  if (!data) return <div className="text-center my-5">Loading food details...</div>;

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={data.imageUrl || 'https://via.placeholder.com/600x700'}
              alt={data.name}
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">
              Category: <span className="badge text-bg-warning">{data.category}</span>
            </div>
            <h1 className="display-5 fw-bolder">{data.name}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through text-muted me-2">
                ₹{(parseFloat(data.price) + 50).toFixed(2)}
              </span>
              <span>₹{parseFloat(data.price).toFixed(2)}</span>
            </div>
            <p className="lead">{data.description}</p>
            <div className="d-flex">
              <input
                className="form-control text-center me-3"
                type="number"
                value="1"
                readOnly
                style={{ maxWidth: '3rem' }}
              />
              <button
                className="btn btn-outline-dark flex-shrink-0"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;

import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../../Service/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validate password match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // Await full response, not just data
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Registration completed. Please login.');
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate("/login");
      } else {
        // Show generic error if status not success
        toast.error('Unable to register. Please try again.');
      }
    } catch (error) {
      // Show detailed backend error message if available
      toast.error(error.response?.data || 'Unable to register. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={data.name}
                    onChange={onChangeHandler}
                    required
                    autoComplete="name"
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                    autoComplete="email"
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={onChangeHandler}
                    required
                    autoComplete="new-password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={onChangeHandler}
                    required
                    autoComplete="new-password"
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                  <Link to="/login">Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import loginBackground from "../../assets/login.jpg";
import { StoreContext } from '../../Pages/Context/StoreContext';
import { toast } from 'react-toastify';
import { login } from '../../Service/authService';

const Login = () => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await login(data);
      if (response.token) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Unable to login. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login. Please try again.');
    }
  };

  return (
    <div
      className="login-bg-wrapper"
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <div style={{ zIndex: 1, width: '100%', maxWidth: '500px' }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mx-auto">
              <div className="card border-0 shadow rounded-3 my-4">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                  <form onSubmit={onSubmitHandler}>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        required
                        autoComplete="email"
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        required
                        autoComplete="current-password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="rememberPasswordCheck" />
                      <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                      </label>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                        Sign in
                      </button>
                    </div>
                    <hr className="my-4" />
                    <div className="d-grid mb-2">
                      <button className="btn btn-google btn-login text-uppercase fw-bold" type="button">
                        <i className="fab fa-google me-2"></i> Sign in with Google
                      </button>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-facebook btn-login text-uppercase fw-bold" type="button">
                        <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <span>Don't have an account? </span>
                      <Link to="/register">Register here</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
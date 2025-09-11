import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../Context/StoreContext.jsx';
import { calculateCartTotal } from '../../Util/CartUtil.js';

const PlaceOrder = () => {
  const { foodList, quantities } = useContext(StoreContext);

  const cartItems = foodList.filter(item => quantities[item.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotal(cartItems, quantities);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <img src={assets.logo} alt="Logo" width="98" height="98" />
      </div>

      <div className="row g-5">
        {/* CART SECTION */}
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>

          {cartItems.length === 0 ? (
            <p className="text-center">No items in cart</p>
          ) : (
            <ul className="list-group mb-3">
              {cartItems.map(item => (
                <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-muted">₹{(item.price * quantities[item.id]).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <strong>₹{shipping.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tax (10%)</span>
                <strong>₹{tax.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>₹{total.toFixed(2)}</strong>
              </li>
            </ul>
          )}
        </div>

        {/* BILLING FORM */}
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">First name</label>
                <input type="text" className="form-control" placeholder="John" required />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" placeholder="Doe" required />
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="you@example.com" />
              </div>
              <div className="col-12">
                <label className="form-label">Phone Number</label>
                <input type="number" className="form-control" placeholder="968574658" required />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="1234 Main St" required />
              </div>
              <div className="col-md-5">
                <label className="form-label">Country</label>
                <select className="form-select" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <select className="form-select" required>
                  <option value="">Choose...</option>
                  <option>Madhya Pradesh</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Zip</label>
                <input type="text" className="form-control" required />
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
              <div className="form-check">
                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked />
                <label className="form-check-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" />
                <label className="form-check-label" htmlFor="debit">Debit card</label>
              </div>
            </div>

            <div className="row gy-3">
              <div className="col-md-6">
                <label className="form-label">Name on card</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Credit card number</label>
                <input type="text" className="form-control" required />
              </div>
            </div>

            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

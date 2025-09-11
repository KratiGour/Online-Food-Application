import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    <section id="contact" className="py-5">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-lg-8 col-xl-6 text-center">
            <h2 className="mt-0">Let's Get In Touch!</h2>
          </div>
        </div>
        <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
          <div className="col-lg-6">
            <form>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Enter your name..."
                  required
                />
                <label htmlFor="name">Full name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="message"
                  placeholder="Enter your message here..."
                  style={{ height: '10rem' }}
                  required
                ></textarea>
                <label htmlFor="message">Message</label>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-xl" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

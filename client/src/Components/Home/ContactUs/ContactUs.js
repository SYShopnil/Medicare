import React from "react";
import contact from "../../../images/contact.jpg";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact">
      {/* title part   */}
      <h1
        id="contact-title"
        className="bg-dark bg-gradient text-light p-5 text-center"
      >
        Contact Us
      </h1>

      {/* form part  */}
      <div className="row mt-5">
        <div className="col-md-5 p-5 ">
          <form className="shadow-lg rounded p-5 bg-light">
            <div class="mb-3">
              <label
                className="form-label text-info font-weight-bold"
                for="exampleInputEmail1"
              >
                Your Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="enter your name"
                id="exampleInputEmail1"
              ></input>
            </div>
            <div className="mb-3">
              <label className="text-info font-weight-bold mb-1" htmlFor="">
                Your Email
              </label>
              <input
                type="email"
                class="form-control"
                placeholder="enter your email"
                id="exampleInputPassword1"
              ></input>
            </div>
            <div className="md-3">
              <label className="text-info font-weight-bold" htmlFor="">
                Your message or comments
              </label>
              <div class="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-info text-light bg-gradient mt-3"
            >
              Submit
            </button>
          </form>
        </div>

        {/* footer image    */}
        <div className="col-md-7 p-5">
          <img className="footerImg" src={contact} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

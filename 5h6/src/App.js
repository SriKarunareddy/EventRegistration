import React, { useState } from "react";
import "./App.css";

function EventRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.event) newErrors.event = "Please select an event";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(formErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Event Registration</h2>
      {submitted && (
        <div className="success-message">
          Registration successful! Thank you, {formData.name}.
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </label>

        <label>
          Select Event:
          <select name="event" value={formData.event} onChange={handleChange}>
            <option value="">-- Choose an event --</option>
            <option value="conference">Conference 2025</option>
            <option value="workshop">React Workshop</option>
            <option value="webinar">Webinar on AI</option>
          </select>
          {errors.event && <div className="error-message">{errors.event}</div>}
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <EventRegistrationForm />
    </div>
  );
}

export default App;

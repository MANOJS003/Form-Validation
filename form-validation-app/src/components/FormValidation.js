import React, { useState } from 'react';
import { FiAlertCircle, FiCheck, FiX, FiFileText, FiCheckCircle, FiChevronRight } from 'react-icons/fi';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const FormValidation = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const minAge = 13; // Minimum age requirement
      const minDob = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
      
      if (dob > minDob) {
        newErrors.dateOfBirth = `You must be at least ${minAge} years old`;
      }
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    // Address validation
    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }

    // State validation
    if (!formData.state?.trim()) {
      newErrors.state = 'State is required';
    }

    // Pincode validation
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    // Terms and conditions validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user interacts with the field
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleAgreeToTerms = () => {
    setFormData(prevState => ({
      ...prevState,
      acceptTerms: true
    }));
    setShowTermsModal(false);
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    const newTouched = {};
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
    });
    
    // Run validation
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      // Simulate form submission
      console.log('Form submitted:', formData);
      setTimeout(() => {
        alert('Form submitted successfully!');
        setIsSubmitting(false);
        
        // Reset form after successful submission
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: '',
          mobileNumber: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          acceptTerms: false
        });
        setErrors({});
      }, 1000);
    } else {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  // Check password requirements and return error message if any
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  // Get password error message if any
  const getPasswordError = () => {
    if (!formData.password) return 'Password is required';
    return validatePassword(formData.password);
  };

  // Only show error after user has started typing in the password field
  const showPasswordError = formData.password !== '';

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="form-container" style={{ textAlign: 'center' }}>
        <div style={{ padding: '2rem' }}>
          <FiCheckCircle style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1.5rem' }} />
          <h2>Thank You!</h2>
          <p>Your form has been submitted successfully.</p>
          <p>We'll get back to you soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form 
        action="https://formsubmit.co/manojamutha1000@gmail.com" 
        method="POST" 
        className="form-container"
        onSubmit={(e) => {
          if (!validateForm()) {
            e.preventDefault();
          } else {
            // Show success message after form submission
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            
            fetch(form.action, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json'
              }
            })
            .then(response => {
              if (response.ok) {
                setIsSubmitted(true);
              } else {
                throw new Error('Form submission failed');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('There was a problem submitting the form. Please try again.');
            });
          }
        }}
      >
        {/* Add hidden fields for FormSubmit */}
        <input type="hidden" name="_subject" value="New Form Submission" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="" />
        {/* Add your thank you page URL as value in the _next field above */}
        <h2 className="form-section-title">Account Information</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="input-container">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.username}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a password"
            />
            {showPasswordError && errors.password && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-container">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
          </div>
        </div>

        <h2 className="form-section-title">Personal Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <div className="input-container">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.dateOfBirth}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="input-container">
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={errors.mobileNumber ? 'error' : ''}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
              />
              {errors.mobileNumber && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.mobileNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="form-section-title">Address Information</h2>
        <div className="form-group">
          <label htmlFor="address">Street Address</label>
          <div className="input-container">
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-textarea ${errors.address ? 'error' : ''}`}
              placeholder="Enter your full address"
              rows="3"
            />
            {errors.address && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <div className="input-container">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
                placeholder="Enter city"
              />
              {errors.city && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.city}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <div className="input-container">
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`form-select ${errors.state ? 'error' : ''}`}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.state}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group" style={{ maxWidth: '200px' }}>
          <label htmlFor="pincode">Pincode</label>
          <div className="input-container">
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={errors.pincode ? 'error' : ''}
              placeholder="6-digit pincode"
              maxLength="6"
            />
            {errors.pincode && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.pincode}</span>
              </div>
            )}
          </div>
        </div>

        <div className="terms-group">
          <div className="terms-card">
            <div className="terms-header">
              <FiFileText className="terms-icon" />
              <h3>Terms & Conditions</h3>
            </div>
            <div className="terms-content">
              <p>Please read and accept our terms and conditions before creating your account.</p>
              <div className="terms-actions">
                <div className={`checkbox-container ${errors.acceptTerms ? 'error' : ''}`}>
                  <label>
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          acceptTerms: e.target.checked
                        }));
                        // Clear error if any
                        if (errors.acceptTerms) {
                          setErrors(prev => ({
                            ...prev,
                            acceptTerms: ''
                          }));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <span className="checkmark"></span>
                    <span className="terms-text">
                      I agree to the{' '}
                      <button 
                        type="button" 
                        className="terms-link" 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleTermsModal();
                        }}
                      >
                        Terms and Conditions
                        <FiChevronRight style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
                      </button>
                    </span>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <div className="error-message">
                    <FiAlertCircle className="error-icon" />
                    <span>{errors.acceptTerms}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '2rem' }}>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!formData.acceptTerms || isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Submit Form</span>
                <FiCheckCircle className="check-icon" />
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={toggleTermsModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Terms and Conditions</h3>
              <button className="close-button" onClick={toggleTermsModal}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="terms-scroll">
                <div className="terms-section">
                  <h4>1. Acceptance of Terms</h4>
                  <p>By accessing or using our service, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service.</p>
                </div>

                <div className="terms-section">
                  <h4>2. User Responsibilities</h4>
                  <p>As a user of our service, you agree to the following responsibilities:</p>
                  <ul>
                    <li>You must be at least 13 years old to use this service.</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You agree to provide accurate and complete information when registering.</li>
                    <li>You are responsible for all activities that occur under your account.</li>
                  </ul>
                </div>

                <div className="terms-section">
                  <h4>3. Prohibited Activities</h4>
                  <p>You agree not to engage in any of the following activities:</p>
                  <ul>
                    <li>Using the service for any illegal purpose or in violation of any laws.</li>
                    <li>Attempting to access or hack into other users' accounts.</li>
                    <li>Uploading or transmitting viruses or any malicious code.</li>
                    <li>Harassing, threatening, or intimidating other users.</li>
                    <li>Impersonating any person or entity.</li>
                  </ul>
                </div>

                <div className="terms-section">
                  <h4>4. Changes to Terms</h4>
                  <p>We reserve the right to modify these terms at any time. We will provide notice of any significant changes through our service or via email. Your continued use of the service after such changes constitutes your acceptance of the new terms.</p>
                </div>
              </div>
              
              <div className="terms-acceptance">
                <p>By clicking "I Agree," you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
                <button className="close-modal" onClick={handleAgreeToTerms}>
                  <span>I Agree</span>
                  <FiCheckCircle className="check-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormValidation;

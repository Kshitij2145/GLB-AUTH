import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    skills: "",
    branch: "",
    year: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white shadow-lg overflow-hidden p-6 md:p-10">
      {/* Left Column */}
      <div className="md:w-1/2 w-full bg-pink-100 flex items-center justify-center sticky top-0 h-screen">
        <img src="image2.png" alt="Logo" className="w-full h-full object-cover scale-95" />
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 w-full p-12 flex flex-col items-center overflow-y-auto">
        {/* Profile Picture Upload */}
        <div className="relative mb-4">
          <label htmlFor="profile-pic" className="cursor-pointer">
            <img src="Profile image.png" alt="Upload Icon" className="w-28 h-28 rounded-full border-4 border-[rgb(255,51,102)] object-cover bg-gray-100" />
          </label>
          <input type="file" id="profile-pic" className="hidden" accept="image/*" />
        </div>
        
        <h2 className="text-[rgb(255,51,102)] text-xl font-bold mb-4">Create Your Account</h2>
        
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {[ 
            { label: "Username", type: "text", id: "username", placeholder: "Your username" },
            { label: "Full Name", type: "text", id: "fullname", placeholder: "Your full name" },
            { label: "Official Email Address", type: "email", id: "email", placeholder: "Your email address" },
            { label: "Password", type: "password", id: "password", placeholder: "Create a password" },
            { label: "Mobile Number", type: "tel", id: "mobile", placeholder: "Your mobile number" },
            { label: "Skills", type: "text", id: "skills", placeholder: "Your skills" },
            { label: "Branch", type: "text", id: "branch", placeholder: "Your branch" },
            { label: "Year of Study", type: "text", id: "year", placeholder: "Your current year" },
            { label: "LinkedIn/GitHub Profile", type: "url", id: "linkedin", placeholder: "Your LinkedIn/GitHub profile" },
          ].map(({ label, type, id, placeholder }) => (
            <div key={id} className="mb-4">
              <label className="text-[rgb(255,51,102)] font-bold text-sm">{label}</label>
              <input 
                type={type} 
                id={id} 
                placeholder={placeholder} 
                required 
                className="w-full p-2 border border-pink-500 rounded-md  focus:border-[rgb(255,51,102)] focus:ring-[rgb(255,51,102)] focus:ring-2" 
                value={formData[id]} 
                onChange={handleChange} 
              />
            </div>
          ))}

          <button type="submit" className="w-full p-3 mt-4 bg-[rgb(255,51,102)] text-white font-bold rounded-md hover:bg-[rgb(255,0,51)]">
            Sign Up
          </button>
        </form>

        {/* Sign In Section */}
        <div className="mt-5 text-center text-sm text-[rgb(255,51,102)]">
          <p>
            Already Have an Account? <a href="loginpage.html" className="font-bold hover:underline">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

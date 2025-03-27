import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",  // Changed from "username" to match the input field
    password: "",
  });
  
  //instance of navigate
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData(prevFormData => ({ ...prevFormData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side - Image */}
      <div className="md:w-1/2 w-full h-screen flex items-center justify-center bg-gray-100">
        <img
          src="loginPageimg.png"
          alt="LoginImage"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-6 md:px-16">
        {/* Logo */}
        <img src="logo.png" alt="Logo" className="w-32 mb-4" />

        {/* Heading */}
        <h1 className="text-black font-bold text-3xl md:text-4xl text-center mb-5 ">
          Let the Journey Begin!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-6 max-w-md italic">
          Unlock a world of learning together with a single click! Please log in to your account.
        </p>

        {/* Login Form */}
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {[{ label: "Official Email Address", type: "email", id: "email", placeholder: "Your email address" },
            { label: "Password", type: "password", id: "password", placeholder: "Create a password" }]
            .map(({ label, type, id, placeholder }) => (
              <div key={id} className="mb-4">
                <label className="text-pink-600 font-bold text-sm">{label}</label>
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  required
                  className="w-full p-3 border border-pink-500 rounded-md focus:border-pink-600 focus:ring-2 focus:ring-pink-600 transition"
                  value={formData[id]} // Fixed: This now correctly maps to formData state
                  onChange={handleChange}
                />
              </div>
            ))}

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-pink-600 text-white font-bold rounded-md hover:bg-[rgb(255,0,51)] cursor-pointer transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         alert("Login successful!");
//       } else {
//         alert("Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full">
//       {/* Left Side - Image */}
//       <div className="md:w-1/2 w-full h-full flex items-center justify-center">
//         <img
//           src="loginPageimg.png"
//           alt="LoginImage"
//           className="w-full h-full object-contain"
//         />
//       </div>

//       {/* Right Side - Form */}
//       <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-6 md:px-16">
//         {/* Logo */}
//         <img src="logo.png" alt="Logo" className="w-32 mb-4" />

//         {/* Heading */}
//         <h1 className="text-black font-bold text-3xl md:text-4xl text-center mb-5">
//           Let the Journey Begin!
//         </h1>

//         {/* Subtitle */}
//         <p className="text-gray-600 text-center mb-6 max-w-md">
//           Unlock a world of learning together with a single click! Please log
//           in to your account.
//         </p>

//         {/* Login Form */}
//         <form className="w-full max-w-md" onSubmit={handleSubmit}>
//           {[
//             {
//               label: "Official Email Address",
//               type: "email",
//               id: "email",
//               placeholder: "Your email address",
//             },
//             {
//               label: "Password",
//               type: "password",
//               id: "password",
//               placeholder: "Create a password",
//             },
//           ].map(({ label, type, id, placeholder }) => (
//             <div key={id} className="mb-4">
//               <label className="text-pink-600 font-bold text-sm">{label}</label>
//               <input
//                 type={type}
//                 id={id}
//                 placeholder={placeholder}
//                 required
//                 className="w-full p-3 border border-pink-500 rounded-md focus:border-pink-600 focus:ring-2 focus:ring-pink-600 transition"
//                 value={formData[id]}
//                 onChange={handleChange}
//               />
//             </div>
//           ))}

//           <button
//             type="submit"
//             className="w-full p-3 mt-4 bg-pink-600 text-white font-bold rounded-md hover:bg-[rgb(255,0,51)] cursor-pointer transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

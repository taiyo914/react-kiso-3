import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      if (result.token) {
        navigate('/home'); // ホーム画面に遷移
      }
    } catch (error) {
      console.error('There was a problem with the login request:', error);
    }
  };


  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg"> 
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })} 
            />
          </label>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
          </label>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:opacity-85 transition-opacity" >Login</button>
      </form>
    </div>
  );
};

export default Login;

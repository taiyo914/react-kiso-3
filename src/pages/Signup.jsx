import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [compressedFile, setCompressedFile] = useState(null);
  const navigate = useNavigate();

  // 追加: アイコン画像をアップロードする関数
  const uploadIcon = async (file, token) => {
    const formData = new FormData();
    formData.append('icon', file);

    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/uploads', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Icon upload result:', result);

    } catch (error) {
      console.error('There was a problem with the icon upload request:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Signup response result:',result);

      // 追加: アイコン画像をアップロード
      if (compressedFile && result.token) {
        await uploadIcon(compressedFile, result.token);
      }

      if (result.token) {
        navigate('/home'); // ホーム画面に遷移 ※ homeのルートを"/"にしたい...
      }
      
    } catch (error) {
      console.error('There was a problem with the signup request:', error);
    }

  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          setCompressedFile(result);
        },
        error(err) {
          console.error(err.message);
        },
      });
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("username", { required: "Username is required" })}
          />
          </label>
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Icon
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:opacity-85 transition-opacity">Sign Up</button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline hover:opacity-75 transition-opacity">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

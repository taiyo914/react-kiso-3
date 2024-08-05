import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';
import './Form.css';

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
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label>Email
            <input 
              type="email" 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })} 
            />
          </label>
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password
            <input 
              type="password" 
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })} 
            />
          </label>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>Icon
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          </label>
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

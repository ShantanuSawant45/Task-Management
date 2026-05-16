import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';


function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleRegister=async()=>{
      try{
        const user_data={
          email:email,
          username:username,
          password:password
        }
        const response=await axios.post('/auth/register/',user_data)
        navigate('/login');
      }
      catch(error){
        setError('Registration failed. Please try again.')  
      }
    }
  return (
   <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        padding: '2.5rem', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <h1 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          marginBottom: '1.5rem', 
          textAlign: 'center', 
          color: '#1f2937' 
        }}>
          Create an Account
        </h1>

        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#dc2626', 
            padding: '0.75rem', 
            borderRadius: '6px', 
            marginBottom: '1.5rem', 
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            handleRegister(); 
          }} 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontSize: '0.875rem', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontSize: '0.875rem', fontWeight: '500' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="johndoe"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#4b5563', fontSize: '0.875rem', fontWeight: '500' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <button
            type="submit"
            style={{ 
              marginTop: '0.5rem', 
              padding: '0.875rem', 
              backgroundColor: '#4f46e5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: '600', 
              fontSize: '1rem', 
              transition: 'background-color 0.2s' 
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}   
export default Register;
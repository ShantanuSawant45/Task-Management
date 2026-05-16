import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Login() {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState('')
        const navigate = useNavigate()
    

        const  handleLogin= async ()=>{

            try{
                const user_data={
                    email:email,
                    password:password
                }
                const response =await api.post('/auth/login/',user_data)
                localStorage.setItem('token',response.data.access_token)
                 navigate('/')
            }
            catch(err){
                setError('Invalid email or password')
            }

        }
    
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    
    )
}

// Basic styling (or use CSS file)


export default Login
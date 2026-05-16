import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import ProjectDetail from './pages/ProjectDetail'
import ProtectedRoute from './components/ProtectedRoute'  

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element= {<Login />} />
      <Route path="/register" element= {<Register />} />

    
      <Route path ="/" element ={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }></Route>
      
      <Route path ="/projects/:id" element={
        <ProtectedRoute>
          <ProjectDetail />
        </ProtectedRoute>
      }>  </Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App



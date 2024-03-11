import React from 'react';
import { Navigate } from 'react-router-dom';
import UserServices from '../Services/UserService';

const userService = new UserServices();

const ProtectedRoutes = ({ children }) => {
    const usuarioAutenticado = userService.usuarioAutenticado()
    console.log('usuarioAutenticado', usuarioAutenticado)
    return usuarioAutenticado ? children : <Navigate to="/login" />
}

export default ProtectedRoutes;
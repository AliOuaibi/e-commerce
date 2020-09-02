import React from 'react'

const LogOut = () => (
    localStorage.removeItem('userId'),
    localStorage.removeItem('userEmail'),
    localStorage.removeItem('userAdress'),
    localStorage.removeItem('userOrders'),
    localStorage.removeItem('userSurname'),
    localStorage.removeItem('userName'),
    localStorage.removeItem('userRole'),

    window.location.href = "/"
)

export default LogOut;
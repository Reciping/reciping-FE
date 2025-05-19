// src/pages/Admin/index.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'


const Admin = () => {
    const navigate = useNavigate()

    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">

            </main>
        </div>
    )
}

export default Admin
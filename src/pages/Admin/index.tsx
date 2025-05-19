// src/pages/Admin/index.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import PageLayout from '../../components/layout/PageLayout'


const Admin = () => {
    const navigate = useNavigate()

    return (
        <PageLayout>
            <AdminSidebar />
            <main className="flex-1 p-6">

            </main>
        </PageLayout>
    )
}

export default Admin
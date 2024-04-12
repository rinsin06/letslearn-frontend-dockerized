import React from 'react';

import SideNav from '../Components/Admin/SideNav/SideNav'

import Dashboard from '../Components/Admin/DashboardComponent/Dashboard';

function AdminDashboard() {
  return (
    <div>  
        <SideNav/>
        <Dashboard/>
    </div>
  );
}

export default AdminDashboard;
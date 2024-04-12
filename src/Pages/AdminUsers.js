import React from 'react';

import SideNav from '../Components/Admin/SideNav/SideNav';
import EnhancedTable from '../Components/Admin/UserList/UserList';



function AdminUsers() {
  return (
    <div>  
        <SideNav/>
        
        <EnhancedTable/>
    </div>
  );
}

export default AdminUsers;
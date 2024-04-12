import React from "react";
import Context from "../Context/Context";
import AdminCourseList from "./AdminCourseList";
import AdminCourseView from "./AdminViewCourse";

function AdminContext() {
  return (
    <div>  
      <Context> {/* Wrap the entire application with the context provider */}
        <AdminCourseList />
        <AdminCourseView />
      </Context>
    </div>
  );
}

export default AdminContext;
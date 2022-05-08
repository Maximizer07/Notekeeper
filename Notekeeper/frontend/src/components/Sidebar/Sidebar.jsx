import React from "react";
function Sidebar(props){
    const className = props.isCollapsed ? "sidebar collapsed" : "sidebar";
    return (
        <aside className={className}>
            <div className="sidebar-header">
            </div>
            <Notes/>
        </aside>
    );
}
export default Sidebar;
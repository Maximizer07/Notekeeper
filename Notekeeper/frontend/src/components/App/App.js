import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import Sidebar from "../Sidebar/Sidebar";
import ThemesModal from "../ThemesModal/ThemesModal";
import './App.css';

function App() {
  const [themeModalIsOpen, setThemeModalIsOpen] = useState(false);
  const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);

  function collapseSidebar() {
    setSidebarIsCollapsed(sidebarIsCollapsed => !sidebarIsCollapsed);
  }
  return (
      <div id="app-container">
        <Sidebar
            isCollapsed={sidebarIsCollapsed}
        />
        <TextEditor
            isCollapsed={sidebarIsCollapsed}
            collapseSidebar={collapseSidebar}
            toggleThemesModal={() => setThemeModalIsOpen(isOpen => !isOpen)}
        />
        <ThemesModal
            isOpen={themeModalIsOpen}
            toggleThemesModal={() => setThemeModalIsOpen(isOpen => !isOpen)}
        />
      </div>
  );
}

export default App;

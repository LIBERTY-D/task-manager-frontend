import {Route, Routes } from "react-router-dom";

import { Home, Login, Register, Dashboard } from "./pages";

import "./App.css";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";


function App() {


  return (
  <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      <Routes>
        <Route path="/login" element={ <PublicRoute><Login /></PublicRoute>} />
      </Routes>

      <Routes>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>

      <Routes>
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      </>
  )
}

export default App;

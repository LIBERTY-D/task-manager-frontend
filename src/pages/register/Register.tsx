import "./register.css"
import {Register as RegisterComponent}  from "../../components"
export const Register=()=>{
  return (
    <div className="register-page">
    <div className="register-header">
      <h1>Manage Your Tasks</h1>
      <p>Make it easier to archieve your goals.</p>
  
    </div>
    <RegisterComponent/>

  </div>
  )
}

import "./login.css"
import {Login as LoginComponent} from "../../components"

export const  Login=()=> {
  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Manage Your Tasks</h1>
        <p>Make it easier to archieve your goals.</p>
    
      </div>
      <LoginComponent/>

    </div>
  )
}

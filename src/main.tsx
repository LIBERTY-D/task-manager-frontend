
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth } from './context/auth/Auth.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth>
      <App />
    </Auth>
    </BrowserRouter>
)

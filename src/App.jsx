import './estilos.css'
import './bootstrap.css'
import Login from './componentes/Login'
import Register from './componentes/Register'
import DashBoard from './componentes/DashBoard'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './componentes/NoEncontrado'
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="*" element={<NoEncontrado/>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App

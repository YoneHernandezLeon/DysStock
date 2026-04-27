import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primeicons/primeicons.css'
import '../node_modules/primeflex/primeflex.css'
import Layout from './layouts/MainLayout'
import Index from './pages/Index'
import Test from './pages/Test'

function App() {

  return (
    <PrimeReactProvider>
      <div className="w-full h-full">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Index />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Routes>
          
        </BrowserRouter>
      </div>
    </PrimeReactProvider>
  )
}

export default App

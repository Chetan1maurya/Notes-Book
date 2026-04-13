import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import {Routes , Route} from 'react-router-dom'
import SplashCursor from './components/SplashCursor';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-gray-300 text-white">
      <SplashCursor />
      {/* Navbar */}
      <Navbar />

      {/* mainContent */}
      <main className="flex-1 container mx-auto p-4 flex flex-col justify-center items-center">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<CreateNote/>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
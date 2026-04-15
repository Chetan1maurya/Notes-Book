import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import {Routes , Route} from 'react-router-dom'
import SplashCursor from './components/SplashCursor';
import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => {
  return (
      <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-gray-300 text-white">
          <SplashCursor />
       <Navbar />
        <main className="flex-1 container mx-auto p-4 flex flex-col">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
            <Route 
              path='/create' 
              element={
                <PrivateRoute>
                  <CreateNote/>
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer/>
      </div>
  )
}

export default App
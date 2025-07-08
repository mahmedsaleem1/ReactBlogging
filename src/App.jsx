import { useEffect, useState } from "react"
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth.service'
import {login, logout} from './store/authSlice'
import Loader from "./components/Loader/loader.component"
import Header from "./components/Header/header.component"
import Footer from "./components/Footer/footer.component"


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
                .then((userData) => {
                  if (userData) {
                    dispatch(login({userData}))
                  } else {
                    dispatch(logout())
                  }
                })
                .catch((error) => {
                  console.error("Error getting current user:", error)
                })
                .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div 
      className="min-h-screen flex flex-wrap content-between bg-gray-400"
    >
      <div
        className="w-full block"
      >
        <Header />
        <main>
          {/* <Outlet /> */}
        </main> 
        <Footer />
      </div>
    </div>
  ) : (<Loader />)
}

export default App

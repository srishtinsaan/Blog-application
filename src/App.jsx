import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "../src/appwrite/auth"
import {login, logout} from "../src/features/authSlice"
import { Footer, Header } from './components/index'
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then( (data) => {
      if(data){
        dispatch(login(data))
      }else{
        dispatch(logout({}))
      }
    } )
    .catch((error) => {
console.log('Appwirte service :: getCurrentUser :: error ', error)
})
    .finally(() => setLoading(false))

  }, [])

  return !loading  ? (
    <div className='w-screen h-screen bg-gray-400 flex justify-center'>
      <div className=''>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App

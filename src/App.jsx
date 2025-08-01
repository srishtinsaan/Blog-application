import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "../src/appwrite/auth"
import {login, logout} from "../src/features/authSlice"
import { Footer, Header } from './components/index'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then( (data) => {
      if(data){
        dispatch(login({data}))
      }else{
        dispatch(logout())
      }
    } )
    .finally(() => setLoading(false))

  }, [])

  return !loading  ? (
    <div className='w-screen h-screen bg-gray-400 flex justify-center'>
      <div className=''>
        <Header/>
        <main>
          {/* outlet */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App

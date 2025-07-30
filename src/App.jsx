import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "../src/appwrite/auth"
import {login, logout} from "../src/features/authSlice"

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
    <div>
      <div>
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

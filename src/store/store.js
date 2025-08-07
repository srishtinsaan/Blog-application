import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice"
	
export const store = configureStore({
    reducer : {
        auth: authReducer
    }
}); 

// if i gave like this... reducer : authReducer
// then on using useSelector i need to pass like this state.status not state.auth.status

export default store 

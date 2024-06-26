import { configureStore } from '@reduxjs/toolkit'
import authReducer from './admin/auth/authSlice'
import ModuleReducer from './admin/module/moduleSlice'
import GeneralReducer from './admin/general/generalSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    module: ModuleReducer,
    general: GeneralReducer,
  }
})
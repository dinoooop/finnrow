import store from '../store'
import { svs } from './svs'

// server values
export class sv {

  static role(needle = null) {
    const data = store.getState().general.stock?.roles || []
    return svs.getRetrun(needle, data)
  }

  static status(needle = null) {
    const data = store.getState().general.stock?.status || []
    return svs.getRetrun(needle, data)
  }

}
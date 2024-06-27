import processData from './processData'
import { svs } from './svs'

// server values
export class sv {

  static role(needle = null) {
    const data = processData.roles || []
    return svs.getRetrun(needle, data)
  }

  static status(needle = null) {
    const data = processData.status || []
    return svs.getRetrun(needle, data)
  }

}
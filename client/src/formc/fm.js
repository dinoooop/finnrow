import { st } from "../bootstrap/st/st";
import processData from "../helpers/processData";
import { sv } from "../helpers/sv";

// form helpers
export class fm {

  static getLabel(name) {
    let parts = name.split('_');
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return parts.join(' ');
  }

  static getOptions(optionType) {

    switch (optionType) {
      case "role":
        return st.roles()
      case "accounts":
        return st.accounts()
      case "hobbies":
        return []
      case "status":
        return st.status()
      case "months":
        return processData.months
      default:
        return []
    }
  }

  static findItemById(id, haystack) {
    return haystack.find(item => item._id === id);
  }


  static toggleArrayItem(id, haystack) {
    const index = haystack.findIndex(item => item === id)
    if (index !== -1) {
      return haystack.filter(item => item !== id)
    } else {
      return [...haystack, id];
    }
  }

  static inArray(needle, haystack) {
    return haystack.some(item => item === needle);
  }

}

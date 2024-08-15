import store from '../store'
import { sv } from './sv'

// Basic functions
export class bc {

  static has(roles) {
    if (roles === 'all') { return true }
    const userRoles = store.getState().auth?.user?.roles || []
    const userRoleNames = userRoles.map(role => role.name)
    const rolesToCheck = roles.split('|')
    return rolesToCheck.some(role => userRoleNames.includes(role))
  }

  static inArrayObject(arobj, needle, property = 'id') {
    if (!arobj) { return false }
    return arobj.some(obj => obj[property] === needle)
  }

  static toggleArrayItem(array, item) {

    const itemToToggle = isNaN(item) ? item : Number(item)

    if (!array) {
      return [itemToToggle]
    }

    const index = array.indexOf(itemToToggle)

    if (index > -1) {
      return [...array.slice(0, index), ...array.slice(index + 1)]
    } else {
      return [...array, itemToToggle]
    }
  }

  static pluckIds(arr) {
    if (!arr) { return [] }
    return arr.map(obj => obj.id)
  }

  static getLabel(name) {
    let parts = name.split('_');
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return parts.join(' ');
  }

  static getOptions(optionType) {

    switch (optionType) {
      case "role":
        return sv.role()
      case "hobbies":
        return []
      case "status":
        return sv.status()
      default:
        return []
    }
  }



  // Convert 2024-06-24T00:00:00.000Z to 2024-06-24
  // How to convert 2024-06-24T00:00:00.000Z to June 24, 2024
  static getDate(dateString = null) {
    let date = '';
    if (dateString) {
      date = new Date(dateString);
    } else {
      date = new Date();
    }

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static displayDate(dateString = null, type) {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    if (type === 'month') {
      return month;
    }

    return `${month} ${day}, ${year}`;
  }

  // date can be 2024-06-24T00:00:00.000+00:00 or 2024-06-24
  static getYear(date) {
    const newDate = date ? new Date(date) : new Date();
    return newDate.getFullYear();
  }

  static getMonth(date) {
    const newDate = date ? new Date(date) : new Date();
    return newDate.getUTCMonth() + 1;
  }

  static skipNullData(data) {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key, value]) => value !== "" && value !== null)
        .map(([key, value]) => [key, value])
    );
  }


}

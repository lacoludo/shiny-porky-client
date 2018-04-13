export function validator(name, val) {
  switch (name) {
    case 'number':
      if (val.length > 16) {
        return false;
      }

      return true;
    case 'exp_month':
      if (val.length > 2) {
        return false;
      }

      return true;
    case 'exp_year':
      if (val.length > 4) {
        return false;
      }

      return true;
    case 'cvc':
      if (val.length > 3) {
        return false;
      }

      return true;
    case 'name':
      return true;
    default:
      return false;
  }
}
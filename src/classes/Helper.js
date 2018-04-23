class Helper {
  static classes(obj, className = '') {
    return className.split(' ').concat(Object.keys(obj).filter((k) => obj[k])).filter((a, i, s) => s.indexOf(a) === i).join(' ');
  }
}

export default Helper;

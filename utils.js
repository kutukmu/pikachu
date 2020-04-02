const debounce = fn => {
  let timeid;
  return (...args) => {
    if (timeid) {
      clearTimeout(timeid);
    }
    timeid = setTimeout(() => {
      fn.apply(null, args);
    }, 1000);
  };
};

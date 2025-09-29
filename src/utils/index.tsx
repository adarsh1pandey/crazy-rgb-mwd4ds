export const customDebounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(this, args);
    }, delay);
  };
};

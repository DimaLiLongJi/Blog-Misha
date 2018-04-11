export default function debounce(fn, delay = 500) {
  let timeoutId = 0;
  return (...args) => {
    if (timeoutId) return;
    timeoutId = setTimeout(() => {
      timeoutId = 0;
      fn(...args);
    }, delay);
  };
}

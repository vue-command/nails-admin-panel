export default function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func(args);
    };
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}

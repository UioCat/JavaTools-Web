export const debounce = (fn: any, delay = 300) => {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

'use client';

const ls = (key: string) => ({
  get: () => {
    const value = window.localStorage.getItem(key);

    try {
      return value ? JSON.parse(value) : value;
    } catch (e) {
      return value;
    }
  },
  set: <T>(value: T) => {
    const tosave = value ? JSON.stringify(value) : String(value);

    window.localStorage.setItem(key, tosave);
  },
});

export default ls;

const addQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url.toString());
};

export { addQueryParam };

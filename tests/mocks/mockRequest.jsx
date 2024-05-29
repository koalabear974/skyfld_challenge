export const createMockRequest = (url) => {
  const urlObject = new URL(url);

  return {
    nextUrl: {
      searchParams: {
        get: (param) => urlObject.searchParams.get(param),
      },
    },
  };
};
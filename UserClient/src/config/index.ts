const publicRuntimeConfig = {
  URL_API_LOCAL: import.meta.env.VITE_URL_API_LOCAL,
};

export const { URL_API_LOCAL } = publicRuntimeConfig;
export default publicRuntimeConfig;

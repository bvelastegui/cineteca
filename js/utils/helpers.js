export function redirect (url, params = null) {
  if (params !== null) {
    params = new URLSearchParams(params);
    url += '?' + params.toString();
  }

  window.location.href = url;
}
export const isXMLHTTPRequestBodyInit = (v): v is XMLHttpRequestBodyInit => v instanceof Blob ||
  v instanceof ArrayBuffer ||
  v instanceof FormData ||
  v instanceof URLSearchParams ||
  typeof v === "string";

/**
 * Converts an object to query parameters and appends to the base URL.
 * @param baseUrl The base URL to which query parameters will be appended.
 * @param filter The filter object containing query parameters.
 * @returns The full URL with query parameters.
 */
export function buildUrlWithQueryParams(baseUrl: string, filter: any): string {
  const queryParams = Object.keys(filter)
    .filter(
      (key) =>
        filter[key] !== undefined && filter[key] !== null && filter[key] !== ''
    )
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(filter[key]))}`
    )
    .join('&');

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
}

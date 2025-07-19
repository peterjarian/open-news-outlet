export function withSearchParams(path: string, ...searchParams: [string, string][]): string {
  const params = new URLSearchParams();

  searchParams.forEach(([key, value]) => {
    params.append(key, value);
  });

  const searchString = params.toString();
  return searchString ? `${path}?${searchString}` : path;
}

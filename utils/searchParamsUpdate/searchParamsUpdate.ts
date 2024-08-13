export default function searchParamsUpdate(key: string, value: string, prev: URLSearchParams) {
  const current = new URLSearchParams(Array.from(prev.entries()));

  if (value) {
    current.set(key, value);
  }

  if (!value) {
    current.delete(key);
  }

  const search = current.toString();
  const q = search ? `?${search}` : '';

  return q;
}

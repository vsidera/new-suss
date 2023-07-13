
export function authHeaders() {
  if (typeof window !== 'undefined') {
    const tokenKey = JSON.parse(localStorage.getItem('key'));
    const authToken = `Token ${tokenKey}`;
    return {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: authToken,
      },
    };
  }}
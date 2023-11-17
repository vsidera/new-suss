import { getSession } from 'next-auth/react';

// export function authHeaders() {
//   if (typeof window !== 'undefined') {
//     const tokenKey = JSON.parse(localStorage.getItem('key'));
//     const authToken = `Token ${tokenKey}`;
//     return {
//       headers: {
//         Accept: 'application/json',
//         'content-type': 'application/json',
//         Authorization: authToken,
//       },
//     };
//   }}

//   getSession() // Example of an asynchronous function returning a session Promise
//   .then(session => {
//     const token = session.accessToken;
//     console.log('Token from session:', token);
//   })
//   .catch(error => {
//     console.error('Error fetching session:', error);
//   });


  export function authHeaders() {
    if (typeof window !== 'undefined') {
      return getSession()
        .then(session => {
          const token = session.accessToken;
          console.log("THE TOKEN BEING SENT IS!!!!!!!!!!",token)
          const authToken = `Bearer ${token}`;
          return {
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json',
              Authorization: authToken,
            },
          };
        })
        .catch(error => {
          console.error('Error fetching session:', error);
          // Handle error case: return headers without Authorization if token retrieval fails
          return {
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json',
            },
          };
        });
    }
  }
  
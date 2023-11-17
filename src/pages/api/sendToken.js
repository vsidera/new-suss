// // pages/api/sendToken.js
// import { getSession } from 'next-auth/react';

// export default async function handler(req, res) {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ error: 'You are not authenticated' });
//   }

//   const token = session.accessToken; // Access the token from the session
//   console.log('Token from session:', token); // Log the token to the console

//   // Replace this section with your API request logic
//   // Example: Sending the token in an API request using fetch
//   try {
//     const apiResponse = await fetch('YOUR_API_ENDPOINT', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       // Include request body or additional parameters if needed
//     });

//     const responseData = await apiResponse.json();
//     res.status(200).json(responseData);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// }

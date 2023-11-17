import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: 'pFvRyEA7aeEI1MpMoWFxkhkz6W8M9sfH',
      clientSecret: 'MhZhwuphszIWYVwJsozU7GJ7NTWwxY9aWgN6nT2rpX-lzgW5LxigxGCt0LK_vAbQ',
      issuer: 'https://dev-xceoh666kp4gr8u8.us.auth0.com',
      redirectUri: `http://localhost:3000/api/auth/callback/auth0`,
      idToken: true,
      token: {
        params: {
          audience: 'https://dev-xceoh666kp4gr8u8.us.auth0.com/api/v2/'
        }
      },
      authorization: {
        params: {
          audience: encodeURI('https://dev-xceoh666kp4gr8u8.us.auth0.com/api/v2/')
        }
      }
    }),
  ],
  secret: '3064e3c73fd940fb24bf86e0199928ed953aa489539e107cf48ce45bc3bd2024',
  session: {
    strategy: 'jwt',
    secret: process.env.NEXTAUTH_SECRET
  },
  jwt: {},
  callbacks: {
    session({ session, token, user }) {
      
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      // console.log('SESSION!!!!!!!:', session);
      return session;
    },
    async redirect(url) {
      if (typeof url === 'string') {
        return url.startsWith('http://localhost:3000') ? url : 'http://localhost:3000';
      } else {
        return 'http://localhost:3000';
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    async signIn( profile) {
      if (profile?.account?.access_token) { // Check if the token exists in the account object
        // console.log('ACCESS TOKEN!!!!!!!:', profile.account.access_token); // Log the token to the console
        return '/apps';
      }
      return true;
    },

  },
});

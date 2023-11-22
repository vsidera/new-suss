import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: 'ojwD0fy1h9KkTwFcpy5GozidovRNSPyX',
      clientSecret: 'CNNd4W_6e_VewDQr9CdnIx_jUA0-sz3rwOISRh0n7a9VBnjytAPxxxXt1jpDedhq',
      issuer: 'https://suss.us.auth0.com',
      redirectUri: 'https://new-suss-staging.vercel.app/api/auth/callback/auth0',
      idToken: true,
      token: {
        params: {
          audience: 'https://suss.us.auth0.com/api/v2/'
        }
      },
      authorization: {
        params: {
          audience: encodeURI('https://suss.us.auth0.com/api/v2/')
        }
      }
    }),
  ],
  secret: '3064e3c73fd940fb24bf86e0199928ed953aa489539e107cf48ce45bc3bd2024',
  session: {
    strategy: 'jwt',
    secret: '3064e3c73fd940fb24bf86e0199928ed953aa489539e107cf48ce45bc3bd2024'
  },
  jwt: {},
  callbacks: {
    session({ session, token, user }) {
      
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      
      return session;
    },
    async redirect(url) {
      if (typeof url === 'string') {
        return url.startsWith('https://new-suss-staging.vercel.app') ? url : 'https://new-suss-staging.vercel.app';
      } else {
        return 'https://new-suss-staging.vercel.app';
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
        console.log('ENVIRONMENTS!!!!!!!:', process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID)
        // return '/apps';
        return true;
      }
      return true;
    },

  },
});

import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { useRouter } from 'next/router';


export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.MY_AUTH0_CLIENT_ID,
      clientSecret: process.env.MY_AUTH0_CLIENT_SECRET,
      issuer: process.env.MY_AUTH0_ISSUER_BASE_URL,
      redirectUri: process.env.MY_AUTH0_REDIRECT_URI,
      idToken: true,
      token: {
        params: {
          audience: process.env.MY_AUTH0_AUDIENCE
        }
      },
      authorization: {
        params: {
          audience: encodeURI(process.env.MY_AUTH0_AUDIENCE)
        }
      }
    }),
  ],
  secret: process.env.AUTH0_SECRET,
  session: {
    strategy: 'jwt',
    secret: process.env.AUTH0_SECRET
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
        return url.startsWith(process.env.MY_AUTH0_BASE_URL) ? url : process.env.MY_AUTH0_BASE_URL;
      } else {
        return process.env.MY_AUTH0_BASE_URL;
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    async signIn( profile) {
      if (profile?.account?.access_token) {
        console.log('ACCESS TOKEN!!!!!!!:', profile.account.access_token);
        // const router = useRouter();
        // router.push('/apps');
        return true;
      }
      return false;
    },

  },
});

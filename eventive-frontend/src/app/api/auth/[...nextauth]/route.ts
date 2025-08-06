import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo accounts for testing
        const demoAccounts = {
          'admin@eventive.com': {
            id: 'demo-admin-1',
            email: 'admin@eventive.com',
            name: 'Admin Demo',
            role: 'admin',
            organizationId: 'demo-org-1',
            password: 'demo123'
          },
          'organizer@eventive.com': {
            id: 'demo-organizer-1',
            email: 'organizer@eventive.com',
            name: 'Organizer Demo',
            role: 'organizer',
            organizationId: 'demo-org-2',
            password: 'demo123'
          },
          'user@eventive.com': {
            id: 'demo-user-1',
            email: 'user@eventive.com',
            name: 'User Demo',
            role: 'user',
            organizationId: 'demo-org-3',
            password: 'demo123'
          }
        };

        // Check for demo accounts first
        const demoUser = demoAccounts[credentials.email as keyof typeof demoAccounts];
        if (demoUser && demoUser.password === credentials.password) {
          return {
            id: demoUser.id,
            email: demoUser.email,
            name: demoUser.name,
            role: demoUser.role,
            organizationId: demoUser.organizationId,
            accessToken: 'demo-access-token',
            refreshToken: 'demo-refresh-token',
          };
        }

        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          
          const { user, access_token, refresh_token } = response.data;

          if (user && access_token) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              organizationId: user.organizationId,
              accessToken: access_token,
              refreshToken: refresh_token,
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.organizationId = user.organizationId;
      }
      return token;
    },
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.role = token.role;
      session.user.organizationId = token.organizationId;
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/login',
  },
  
  session: {
    strategy: 'jwt' as const,
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;

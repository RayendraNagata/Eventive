import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      organizationId: string;
    };
  }

  interface User {
    role: string;
    organizationId: string;
    accessToken: string;
    refreshToken: string;
  }
}

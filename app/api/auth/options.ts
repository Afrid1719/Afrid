import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials)
        const user = {
          id: '1',
          username: 'admin@gmail.com',
          password: 'password',
        }
        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user
        }
        return null
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
}

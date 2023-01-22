// ./initAuth.js
import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    firebaseAuthEmulatorHost: 'localhost:9099',
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.APP_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: process.env.DATABASE_URL,
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyBr5r9ij_ERFgD894IR8L-YxTRRzepC-V4", // required
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.APP_ID,
    },
    cookies: {
      name: 'Cert-Painel', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: false,
    },
  })
}

export default initAuth
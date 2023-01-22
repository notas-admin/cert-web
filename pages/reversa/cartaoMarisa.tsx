import Head from 'next/head';
import MainHeader from '../../components/header';
import MainSidebar from '../../components/sidebar';
import Dashboard from '../../components/dashboard';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';

const Cartaocert = () => {
  const { query } = useRouter();
  const AuthUser = useAuthUser();
  const action = query.action || "";
  const research = query.research || "";
  const smodo = query.smodo || "";
  const sdatain = query.sdatain || "";
  const sdatafi = query.sdatafi || "";


  return (
    <div>
      <Head>
        <title>Marketplace 360 - Reversa - Cartão cert</title>
        <meta name="description" content="Reversa 360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { AuthUser.email && AuthUser.signOut? (<MainHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}
      < MainSidebar page="reversa" action={action.toString()} mainAction="cartaocert"/>
      <Dashboard action={action.toString()} mainAction="cartaocert"  research={research.toString()} smodo={smodo.toString()} sdatain={sdatain.toString()} sdatafi={sdatafi.toString()}/>
    </div>
  );
};

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(Cartaocert)
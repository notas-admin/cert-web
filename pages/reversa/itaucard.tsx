import Head from 'next/head';
import MainHeader from '../../components/header';
import MainSidebar from '../../components/sidebar';
import Dashboard from '../../components/dashboard';
import { useRouter } from 'next/router'
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'



const Itaucard = () => {
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
        <title>Marketplace 360 - Reversa - Itaucard</title>
        <meta name="description" content="Reversa 360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { AuthUser.email && AuthUser.signOut? (<MainHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}

      < MainSidebar page="reversa" action={action.toString()} mainAction="itaucard"/>
      <Dashboard action={action.toString()} mainAction="itaucard"  research={research.toString()} smodo={smodo.toString()} sdatain={sdatain.toString()} sdatafi={sdatafi.toString()}/>
    </div>
  );
};
export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(Itaucard)
import Head from 'next/head';
import MainHeader from '../components/header';
import MainSidebar from '../components/sidebar';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'



const MainDash = () => {

  const AuthUser = useAuthUser()

  return (
    <div>
      <Head>
        <title>Marketplace 360</title>
        <meta name="description" content="Reversa 360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { AuthUser.email && AuthUser.signOut? (<MainHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}
      < MainSidebar  page="" action="" mainAction=""/>
      <div className="content-wrapper">
      <div className="container-fluid">

      <h4 className="d-flex justify-content-center" style={{paddingTop:"10%"}}>Escolha a opção que deseja ao lado</h4>
      </div>
      </div>
    </div>
  );
};

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(MainDash)

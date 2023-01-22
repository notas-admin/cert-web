import Head from 'next/head';
import { Container, Button } from '@material-ui/core';
import HomeHeader from '../components/headerHome';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

const Home = () => {


let loginWarning;
const AuthUser = useAuthUser();
if(!!AuthUser.id){
  loginWarning = (
  <div>
    <h6 className="d-flex justify-content-center">Você já está logado como {AuthUser.displayName}</h6>
  <div className="d-flex justify-content-center">
    <Button variant="contained" href="/maindash" color="primary" style={{margin:"10px"}}>
      Seguir para o Dashboard
    </Button>
  </div>
  </div>
    )
}else{
  loginWarning = (<div>
    <h6 className="d-flex justify-content-center">Você não está logado</h6>
  <div className="d-flex justify-content-center">
    <Button variant="contained" color="secondary" style={{margin:"10px"}}  href="/login" >
      Login
    </Button>
  </div>
  </div>
  )
}

  return (
    <div>
      <Head>
        <title>Marketplace 360</title>
        <meta name="description" content="Reversa 360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        { AuthUser.email && AuthUser.signOut? (<HomeHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}
      <Container>
      <img src="certpainel.png" className="mx-auto" style={{display: "flex", marginTop:"15%", height:"auto"}}/>
      <br/>
      {loginWarning}
      </Container>

    </div>
  );
};


export const getServerSideProps = withAuthUserTokenSSR()()

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // Parse
//   const cookies = await nookies.get(ctx,"teste");
//   console.log(cookies);
//   let roleCookie;

//   if(Object.keys(cookies).length < 1){
//     roleCookie = JSON.stringify(['inicial']);
//     nookies.set(null, "USER_ROLE", roleCookie);
//   } else {
//     roleCookie = cookies.USER_ROLE;
//   }

//   console.log(roleCookie);

//   return { props: {
//     USER_ROLES: roleCookie,
//     },
//   }
// }


export default withAuthUser()(Home)
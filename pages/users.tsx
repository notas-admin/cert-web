/* eslint-disable react/jsx-key */
import Head from 'next/head';
import MainHeader from '../components/header';
import MainSidebar from '../components/sidebar';
import axios from 'axios';
import useSWR from 'swr';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'
import { Player } from '@lottiefiles/react-lottie-player';
import ModalCreateUser from '../components/modalCreateUser'

const Users = () => {
  const excluir= async (email: string)=>{
    let result = confirm("Deseja mesmo deletar " + email +" ?")
    if(result){
      const api = await axios.post("/api/firebase/delete", { email: email})
    }
    location.reload();
  }

  const AuthUser = useAuthUser()
  const fetcher = (url: string) => axios.get(url).then( res => res.data)
  const { data }: any = useSWR("/api/firebase/user", fetcher);
  if(typeof data != 'undefined'){
    let data2;
    data2 = data.users.users
    return (
      <div>
        <Head>
          <title>Marketplace 360</title>
          <meta name="description" content="Reversa 360" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        { AuthUser.email && AuthUser.signOut? (<MainHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}
        < MainSidebar  page="users" action="" mainAction=""/>
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">



            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Acessos</th>
                </tr>
              </thead>
              <tbody>
                {data2.map((dado: any) => (
                    <tr>
                      <td>
                      {/* <button className="btn btn-primary"  style={{ marginRight:"6px"}} > <i className="fas fa-address-book"></i> </button> */}
                      <button className="btn btn-danger" onClick={()=>{excluir(dado.email)}}> <i className="fas fa-window-close"></i></button>
                      </td>
                      <td>  {dado.displayName} </td>
                      <td> {dado.email}  </td>
                      <td>{dado.customClaims.role.map((dat: any)=> <li>{dat}</li> )}</td>
                      {/* <td> {JSON.stringify(dado.customClaims.role)} </td> */}
                    </tr>
              ))}
              </tbody>
            </table>

                  <ModalCreateUser/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );} else {
      return(
        <div>
          <Player
            autoplay
            loop
            src="https://assets7.lottiefiles.com/private_files/lf30_88nb1f.json"
            style={{ height: '300px', width: '300px' }}
          />
        </div>
      )
    }
};

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(Users)
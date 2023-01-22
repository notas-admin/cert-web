import { withAuthUser, withAuthUserTokenSSR, AuthAction, useAuthUser} from 'next-firebase-auth'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import axios from 'axios';


import HomeHeader from '../../components/headerHome';
const Detail = ({nota}:any) =>{
  const AuthUser = useAuthUser();
  const { query } = useRouter();
  let path;
  const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

  const rejeitar= async (payload: any)=>{
    path= "/api/painel/api/v1/"+query.mainAction+"/"+query.path+"/reject";
    const api = await axios.post(path, {exchange_and_return_order_code: [payload]})
    // location.reload();
  }

  const aprovar= async (payload: any)=>{
    path="/api/painel/api/v1/"+query.mainAction+"/"+query.path+"/approve";
    const api = await axios.post(path, {exchange_and_return_order_code: [payload]})
    // location.reload();
  }

  const numberFormat = (value:number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  return(
    <>
      <Head>
        <title>Marketplace 360</title>
        <meta name="description" content="Reversa 360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        { AuthUser.email && AuthUser.signOut? (<HomeHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}
        <div className="content-wrapper" style={{ marginLeft:"0px" }}>
          <div className='content'>
            <div className="container-fluid">
              <div className='card' style={{padding:"20px"}}>
                <h3 style={{color:"#00ff78"}}>Order - {nota.exchange_and_return_order_code}</h3>
                <h3>Status - {nota.status}</h3>
                <br/>
                <h4>Total Value -  { numberFormat(nota.total_value)} </h4>
                <h4> Total Discount - {numberFormat(nota.total_discount)}</h4>
                <br/>
                <h5>Return date -{nota.return_date}  {nota.return_time}</h5>
                <h6>Resposta do Serviço - </h6>

                {/* <div>
                  <button onClick={()=>{aprovar(nota.exchange_and_return_order_code)}} className="btn btn-success" style={{marginRight:"10px"}}>Aprovar</button>
                  <button onClick={()=>{rejeitar(nota.exchange_and_return_order_code)}} className="btn btn-danger">Rejeitar</button>
                </div> */}

                <hr/>
                <h5>Visualização Completa</h5>
                <DynamicReactJson src={nota} />
              </div>
            </div>
          </div>

        </div>
    </>
  )
}


export const getServerSideProps = withAuthUserTokenSSR()(
  async (context) => {
    let query = context.query
    let action = (query.mainAction == "cartaocert")? "cert" : query.mainAction;
    let path = action + "/" + query.path + "/code/" + query.code
    const res = await fetch("http://localhost:3000/api/painel/api/v1/"+ path)
    const json = await res.json()
    return {
      props: {
        nota: json
      }
    }
  }
)

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(Detail)
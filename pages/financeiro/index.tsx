import Head from 'next/head';
import MainHeader from '../../components/header';
import MainSidebar from '../../components/sidebar';
import nookies from 'nookies';

import { useState } from 'react';
import { useRouter } from 'next/router'
import UploadButtons from "../../components/btnupload"
import FormControl from '@mui/material/FormControl';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import Button from '@material-ui/core/Button';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'
import pt from 'date-fns/locale/pt-BR';
import Table2 from "../../components/table2";
registerLocale('pt-BR', pt);
import "react-datepicker/dist/react-datepicker.css";




const FinanPage = () => {
  const { query } = useRouter();
  const AuthUser = useAuthUser();
  const [shouldRender, setShouldRender] = useState(false);
  const [dateUpdate, setDateUpdate] = useState(true);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [querySearch, setQuery] = useState("");
  const [startDate, endDate] = dateRange;
  const { register, handleSubmit } = useForm<FormValues>();

  let research;
  let sdatain:any;
  let sdatafi:any;

  if(!!query){
    research = query.research;
    sdatain = query.sdatain;
    sdatafi = query.sdatafi;
  }
  type FormValues = {
    mocked: string;
    modo: string;
  };

  const somaZero = (dado: Number) => {
    return (dado <= 9) ? '0' + dado : dado;
  };

  if(!!research){
    setTimeout(function(){
      let url:string;
      let dataInicial;
      let dataFinal;
      let diaLimite;
      let diaFinal;

      if(dateUpdate){
        if(!!sdatain && !!sdatafi){
          let dataInicialArray = sdatain.split("/");
          dataInicial = new Date ( dataInicialArray[1]+" "+ dataInicialArray[0] + " " + dataInicialArray[2]);
          let dataFinalArray = sdatafi.split("/");
          dataFinal = new Date (dataFinalArray[1]+" "+  Number(dataFinalArray[0]).toString() + " " + dataFinalArray[2]);
          setDateRange([dataInicial, dataFinal])
          diaFinal = new Date(dataFinal.getFullYear(), dataFinal.getMonth() + 1, 0);
          if(dataFinal.getDate() == diaFinal.getDate()){
            diaLimite = somaZero(dataFinal.getDate()) +"/"+(dataFinal.getMonth()+1)+"/"+dataFinal.getFullYear();
          } else{
            diaLimite = somaZero(dataFinal.getDate()+1)+"/"+(dataFinal.getMonth()+1)+"/"+dataFinal.getFullYear();
          }
        }
        url="finances/chargerback?order_date_inicial="+sdatain+"&order_date_final="+diaLimite+"&integrated=true"
        setQuery(url);
        setDateUpdate(false);
      }
    setShouldRender(true);
  },1000)
}


  const onSubmit: SubmitHandler<FormValues> = dado => {
    let data:any;
    let data2:any;
    let diaFinal:any;

    [data, data2] = dateRange;

    if (data == null) {
      data = new Date();
    };

    if(data2 == null){
      data2 = new Date();
    }

    let dataInicial = somaZero(data.getDate())  + "/" + (somaZero((data.getMonth() + 1))) + "/" + data.getFullYear()
    let dataFinal = somaZero(data2.getDate())  + "/" + (somaZero((data2.getMonth() + 1))) + "/" + data2.getFullYear()
    window.location.href="/financeiro/?research=true&sdatain="+dataInicial+"&sdatafi="+dataFinal;
  };

  const router = useRouter()


  return (
    <div>
      <Head>
        <title>Marketplace 360 - Financeiro</title>
        <meta name="description" content="Reversa 360" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { AuthUser.email && AuthUser.signOut? (<MainHeader email={AuthUser.email} signOut={AuthUser.signOut}/>) :( <p></p>)}

      < MainSidebar page="financeiro" action="" mainAction=""/>


      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3 style={{marginLeft:"10px"}}> <i className="nav-icon fas fa-landmark"/> Financeiro</h3>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <p> Adicione aqui os produtos em csv.</p>
                    <UploadButtons/>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{display:'flex', marginTop:"14px"}}>
                          <i className="nav-icon fas fa-calendar-alt" style={{paddingRight:'10px', paddingTop:'4px'}}></i>
                          <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update: any) => {
                              setDateRange(update);
                            }}
                            locale="pt-BR"
                            dateFormat="dd/MM/yyyy"
                            isClearable={true}
                          />
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <div>
                              <Button type="submit" className="btn-primary" style={{height:"56px"}} variant="contained">Buscar</Button>
                            </div>
                          </FormControl>
                        </div>
                    </form>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                      {shouldRender && <Table2 query={querySearch}/> }
                      {!shouldRender && (<h6>Faça a sua pesquisa</h6>) }
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
        </div>

    </div>
  );
};

export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(FinanPage)
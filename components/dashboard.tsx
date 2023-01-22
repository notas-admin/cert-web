import { useState } from 'react';
import Select, { SelectChangeEvent }  from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import {VFC} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth'
import pt from 'date-fns/locale/pt-BR';
import Table from "./table";

registerLocale('pt-BR', pt)


import "react-datepicker/dist/react-datepicker.css";

type Props = {
  mainAction: string
  action: string
  research: string
  smodo: string
  sdatain: string
  sdatafi: string
}

type FormValues = {
  mocked: string;
  modo: string;
};

const Dashboard: VFC<Props> = ({mainAction, action, research, smodo, sdatain, sdatafi}) =>{


  const { register, handleSubmit } = useForm<FormValues>();
  const somaZero = (dado: Number) => {
    return (dado <= 9) ? '0' + dado : dado;
  };



  const handleChange = (event: SelectChangeEvent) => {
    setModeSearchAux(event.target.value);
  };


  let servicePath: string;
  let servicePathAux: string;

  if(mainAction == "cartao"){
    servicePathAux = action;
    servicePath = "cartao/" + servicePathAux;
  } else if (mainAction == "boleto"){
    servicePathAux = action == "estorno" ? "reembolso" : action;
    servicePath = "boleto/" + servicePathAux;
  } else if (mainAction == "itaucard"){
    servicePathAux = action == "estorno" ? "reembolso" : action;
    servicePath = "itaucard/" + servicePathAux;
  } else if (mainAction == "cartaocert"){
    servicePathAux = action == "estorno" ? "reembolso" : action;
    servicePath = "cert/" + servicePathAux;
  } else {
    servicePathAux = action;
    servicePath = "pix/" + servicePathAux;
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
    let modo = modeSearchAux;
    window.location.href='/reversa/'+mainAction+'?action='+action+"&research=true&smodo="+modo+"&sdatain="+dataInicial+"&sdatafi="+dataFinal;
  };


  const [shouldRender, setShouldRender] = useState(false);
  const [modeSearch, setModeSearch] = useState("");
  const [modeSearchAux, setModeSearchAux] = useState("");
  const [dateUpdate, setDateUpdate] = useState(true);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [querySearch, setQuery] = useState("");
  const [startDate, endDate] = dateRange;

  let title;
  if(mainAction == "cartao"){
    title = (<h3 style={{marginLeft:"10px"}}><i className="fas  fa-credit-card"/> Cartão - {servicePathAux}</h3>)
  } else if (mainAction == "boleto"){
    title = (<h3 style={{marginLeft:"10px"}}><i className="fas  fa-barcode"/> Boleto - {servicePathAux}</h3>)
  } else if (mainAction == "itaucard"){
    title = (<h3 style={{marginLeft:"10px"}}><i className="fas  fa-money-check"/> Itaucard - {servicePathAux}</h3>)
  } else if (mainAction == "cartaocert"){
    title = (<h3 style={{marginLeft:"10px"}}><i className="fas  fa-id-card"/> Cartão cert - {servicePathAux}</h3>)
  } else {
    title = (<h3 style={{marginLeft:"10px"}}><i className="fas  fa-money-bill"/> Pix - {servicePathAux}</h3>)
  }

  if(research=="true"){
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
            diaLimite = somaZero(dataFinal.getDate()) +"/"+somaZero((dataFinal.getMonth()+1))+"/"+dataFinal.getFullYear();
          } else{
            diaLimite = somaZero(dataFinal.getDate()+1)+"/"+somaZero((dataFinal.getMonth()+1))+"/"+dataFinal.getFullYear();
          }
        }
        setShouldRender(true);
        smodo = !!smodo? smodo: "all";
        if(smodo !== 'all'){
          url = servicePath + "/"+ smodo +"?order_date_inicial="+ sdatain +"&order_date_final="+ diaLimite;
        } else{
          url = servicePath +"?order_date_inicial="+ sdatain +"&order_date_final="+ diaLimite;
        }
        if(modeSearch=="" ){
          setModeSearch(smodo);
          setModeSearchAux(smodo);
        }
        setQuery(url);
        setDateUpdate(false);
      }




      setShouldRender(true);
    },1000)
  }

  return(
  <div className="content-wrapper">

      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {title}
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
                        <Select
                          style={{marginLeft: '20px', marginRight: '20px'}}
                          value={modeSearchAux}
                          id="select-status"
                          onChange={handleChange}
                        >
                          <MenuItem value="status61">Status 61</MenuItem>
                          <MenuItem value="approve">Aprovados</MenuItem>
                          <MenuItem value="reject">Rejeitados</MenuItem>
                          <MenuItem value="all">Todos</MenuItem>
                        </Select>
                      </FormControl>
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
                    {shouldRender && <Table query={querySearch} modo={modeSearch} mainAction={mainAction} servicePath={servicePathAux} /> }
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
  )
}

export default  withAuthUser<Props>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login'
})(Dashboard)

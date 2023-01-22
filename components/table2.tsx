import axios from 'axios';
import {useState} from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Script from 'next/script';
import { Player } from '@lottiefiles/react-lottie-player';
import Moment from 'moment';
type Props = {
  query: string
}

const Table2 = (props: Props) => {
  let path;
  let nota: number[] = [];
  const { mutate } = useSWRConfig();
  const fetcher = (url: string) => axios.get(url).then( res => res.data);
  const { data }: any = useSWR("/api/financeiro/api/v1/"+props.query, fetcher);
  const [notaStatus, setNotaStatus] = useState(nota)

  // const rejeitar= async (payload: any, i: number)=>{
  //   let action = (props.mainAction == "cartaocert")? "cert" : props.mainAction;

  //   path= "/api/painel/api/v1/"+action+"/"+props.servicePath+"/reject";
  //   setNotaStatus([...notaStatus, i]);
  //   const api = await axios.post(path, {exchange_and_return_order_code: [payload]})
  //   mutate("/api/painel/api/v1/"+props.query);
  //   setTimeout(function(){ setNotaStatus([]); }, 1000);
  // }

  // const aprovar= async (payload: any, i: number)=>{
  //   let action = (props.mainAction == "cartaocert")? "cert" : props.mainAction;
  //   path="/api/painel/api/v1/"+action+"/"+props.servicePath+"/approve";
  //   setNotaStatus([...notaStatus, i]);
  //   const api = await axios.post(path, {exchange_and_return_order_code: [payload]})
  //   console.log(api)
  //   mutate("/api/painel/api/v1/"+props.query);
  //   setTimeout(function(){ setNotaStatus([]); }, 1000);
  // }



  const numberFormat = (value:number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  if(data===''){
    return(
      <div>
        <Player
          autoplay
          loop
          src="https://assets5.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"
          style={{ height: '300px', width: '300px' }}
        />
        <h4 className='mx-auto center'>Sem Resultados</h4>
      </div>
    )
  } else if(!!data && (data instanceof Array)){
      return (
      <div>
          <table id="example1" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Protocol</th>
              <th>Order</th>
              <th>Fulfillment</th>
              <th>Order date</th>
              <th>Created at</th>
              <th>Update at</th>
            </tr>
          </thead>
          <tbody>

          {data.map((dado: any, i) => (
                <tr>
                  <td>  {dado.id} </td>
                  <td> {dado.protocol}  </td>
                  <td> {dado.orde}  </td>
                  <td> {dado.fulfillment}  </td>
                  <td> {Moment(dado.data_envio).format("DD/MM/YYYY HH:mm") }</td>
                  <td> {Moment(dado.created_at).format("DD/MM/YYYY HH:mm") }</td>
                  <td> {Moment(dado.update_at).format("DD/MM/YYYY HH:mm") }</td>
                </tr>
          ))}
          </tbody>
        </table>
        {/* <Script  src="/static/datatables/jquery.dataTables.min.js" />
        <Script strategy="lazyOnload" src="/static/datatables/dataTables.bootstrap4.min.js"/>
        <Script strategy="lazyOnload" src="/static/datatables/dataTables.responsive.min.js"/>
        <Script  strategy="lazyOnload" src="/static/bootstrap/responsive.bootstrap4.min.js"/>
        <Script  src="/static/datatables/dataTables.buttons.min.js"/>
        <Script  strategy="lazyOnload" src="/static/datatables-buttons/buttons.bootstrap4.min.js"/>
        <Script  src="/static/datatables-buttons/buttons.colVis.min.js"/>
        <Script  src="/static/datatables-buttons/buttons.html5.min.js"/>
        <Script  src="/static/datatables-buttons/buttons.print.min.js"/>
        <Script  src="/static/datatables-buttons/dataTables.buttons.min.js"/> */}
        <Script strategy="lazyOnload" src="/static/js/tes.js" />
      </div>
      ) } else {
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
}

export default Table2
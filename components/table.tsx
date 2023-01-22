import axios from 'axios';
import {useState} from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Script from 'next/script';
import { Player } from '@lottiefiles/react-lottie-player';
import Moment from 'moment';
import { Box, Button, Checkbox, Modal, SelectChangeEvent, Typography } from '@mui/material';
type Props = {
  query: string
  modo: string
  servicePath: string
  mainAction: string
}


const style2 = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Table = (props: Props) => {
  let path;
  let nota: number[] = [];
  let order: string[] = [];
  const { mutate } = useSWRConfig();
  const fetcher = (url: string) => axios.get(url).then( res => res.data);
  const { data }: any = useSWR("/api/painel/api/v1/"+props.query, fetcher);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openRej, setOpenRej] = useState(false);
  const handleOpenRej = () => setOpenRej(true);
  const handleCloseRej = () => setOpenRej(false);
  const [notaStatus, setNotaStatus] = useState(nota);
  const [orderList, setOrderList] = useState(order);
  const  [orderCount, setOrderCount] = useState(0);
  const  [orderSelect, setOrderSelect] = useState(false);

  const rejeitar= async (payload: any, i: number)=>{
    let action = (props.mainAction == "cartaocert")? "cert" : props.mainAction;

    path= "/api/painel/api/v1/"+action+"/"+props.servicePath+"/reject";
    setNotaStatus([...notaStatus, i]);
    const api = await axios.post(path, {exchange_and_return_order_code: [payload]})
    mutate("/api/painel/api/v1/"+props.query);
    setTimeout(function(){ setNotaStatus([]); }, 1000);
  }

  const aprovar= async (payload: any, i: number)=>{
    let action = (props.mainAction == "cartaocert")? "cert" : props.mainAction;
    path="/api/painel/api/v1/"+action+"/"+props.servicePath+"/approve";
    setNotaStatus([...notaStatus, i]);
    // if(props.mainAction !="cartaocert"){
      const api = await axios.post(path, {exchange_and_return_order_code: [payload.exchange_and_return_order_code]})
    // } else {
    //   let code = payload.exchange_and_return_order_code;
    //   const api = await axios.post(path, {
    //     exchange_and_return_order_code: [code],
    //     cart: "4111 1111 1111",
    //     order: code.charAt(code.length - 9),
    //     value: payload.total_value,
    //     description: "retorno feito via painel novo cert",
    //     force: "N",
    //     operator: "Painel novo"
    //   })
    // }
    mutate("/api/painel/api/v1/"+props.query);
    setTimeout(function(){ setNotaStatus([]); }, 1000);
  }

  const approveAll = async ()=>{
    let action = (props.mainAction == "cartaocert")? "cert" : props.mainAction;
    path="/api/painel/api/v1/"+action+"/"+props.servicePath+"/approve";
    const api = await axios.post(path, {exchange_and_return_order_code: orderList});
    mutate("/api/painel/api/v1/"+props.query);
  }

  const rejectAll = async ()=>{
    let action = (props.mainAction == "cartaocert")? "cert" : props.mainAction;
    path="/api/painel/api/v1/"+action+"/"+props.servicePath+"/reject";
    const api = await axios.post(path, {exchange_and_return_order_code: orderList});
    mutate("/api/painel/api/v1/"+props.query);
  }

  const addArrayOrder = (event:SelectChangeEvent) =>{
    const value = event.target.value;
    let orders:string[] = orderList;
    let count = orderCount;
  if(value && !orderList.includes(value)){
      orders.push(value);
      count++;
  } else if (value && orderList.includes(value)){
      const index = orders.indexOf(value);
      orders.splice(index,1);
      count--;
  }
    setOrderList(orders);
    setOrderCount(count);
  }


  const selectAll = (dado:any) =>{
    let orders:string [] = [];
    let d = 0;

    data.map((dado:any)=>{
      if(dado.status ==="SAVED"){
        d++;
        orders.push(dado.exchange_and_return_order_code)
      }
    });

    setOrderList(orders);
    setOrderCount(d);
    setOrderSelect(!orderSelect);

    if(orderSelect){
      setOrderList([]);
      setOrderCount(0)
    };
  }



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
          {props.modo=="status61" &&
            <div>
              <Checkbox onChange={()=>{selectAll(data)}} value="all" checked={orderSelect}/>
              <Button onClick={handleOpen} className="btn-primary" style={{marginRight:"16px"}} variant="contained" disabled={orderCount<1}>Aprovar Seleção</Button>
              <Button onClick={handleOpenRej} className="btn-primary" variant="contained" disabled={orderCount<1}>Rejeitar Seleção</Button>
            </div>}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Deseja mesmo <b>APROVAR</b> {orderCount} pedido(s)?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <button onClick={approveAll} className="btn btn-success" style={{ marginRight:"8px"}} >Aprovar</button>
                  <button onClick={handleClose} className="btn btn-danger" >Cancelar</button>
                </Typography>
              </Box>
            </Modal>
            <Modal
              open={openRej}
              onClose={handleCloseRej}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Deseja mesmo <b>Rejeitar</b> {orderCount} pedido(s)?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <button onClick={rejectAll} className="btn btn-success" style={{ marginRight:"8px"}} >Rejeitar</button>
                  <button onClick={handleCloseRej} className="btn btn-danger" >Cancelar</button>
                </Typography>
              </Box>
            </Modal>
          <table id="example1" className="table table-bordered table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Type</th>
              <th>Return Order Code</th>
              <th>Original Order</th>
              <th>Amount</th>
              <th>Fulfillment</th>
              <th>Order date</th>
              <th>Created at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

          {data.map((dado: any, i) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  {props.modo=="status61" && dado.status =="SAVED" && !!!notaStatus.includes(i) &&
                  <td>
                    <Checkbox onChange={addArrayOrder} value={dado.exchange_and_return_order_code} checked={orderList.includes(dado.exchange_and_return_order_code)}/>
                  {/* @ts-ignore */}
                    <button className="btn btn-success" onClick={()=>{aprovar(dado, i)}} style={{ marginRight:"6px"}} type="submit"> <i className="fas fa-check"></i></button> {notaStatus.includes(i) && <span>true</span>}
                    <button className="btn btn-danger" onClick={()=>{rejeitar(dado.exchange_and_return_order_code, i)}} > <i className="fas fa-window-close"></i></button>
                  </td>
                  }
                  {props.modo=="status61" && !!notaStatus.includes(i) &&
                  <td>
                    <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> Processando
                  </td>}
                  {props.modo!="status61" &&
                  <td>
                  </td>}
                  {props.modo=="status61" && dado.status !="SAVED" &&
                  <td>
                  </td>}
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{dado.type} </a></td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer"> {dado.exchange_and_return_order_code} </a></td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{dado.original_order_code} </a> </td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{numberFormat(dado.total_value)} </a></td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{dado.fulfillment} </a></td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{dado.order_date} </a></td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{Moment(dado.created_at).format("DD/MM/YYYY HH:mm") }</a></td>
                  <td> <a href={"/reversa/detail?mainAction="+props.mainAction+"&path="+props.servicePath+"&code="+dado.exchange_and_return_order_code} target="_blank" rel="noreferrer">{dado.status}</a> </td>
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

export default Table
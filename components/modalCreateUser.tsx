import {useState, ChangeEvent} from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Switch from '@mui/material/Switch';
import axios from 'axios';


type FormValues={
  name: string,
  password: string,
  email: string,
}

// reactstrap components

function ModalCreateUser() {
  const [modalOpen, setModalOpen] = useState(false);
  const {control, register, handleSubmit,  formState: { errors } } = useForm<FormValues>();

  const [state, setState] = useState({
    admin: false,
    financeiro: false,
    reversa: false,
  });


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async dado => {
    let role:string[];
    role=[];
    Object.entries(state).forEach((([key, value])=>{
      value ? role.push(key):"";
    }))

    if(role.length < 1){
      alert("Atenção: Escolha algum acesso");
    }

    const api = await axios.post("/api/firebase/create", { displayName: dado.name, email: dado.email, password: dado.password, role: role})
    setModalOpen(!modalOpen);
    location.reload();
  }

  return (
    <>
      <Button
        color="success"
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Criar Novo User
      </Button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
          <i className="fas fa-users"> Novo Usuário</i>
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
          <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <small className="form-text text-muted">Todas os Campos devem ser preenchidos.</small>
                  <div className="form-group">
                    <label>Nome</label><br/>
                    <input type="text" placeholder="Nome" {...register("name", { required: true, maxLength: 20 })} />
                    <br/>
                    {errors.name && errors.name.type === "required" && <span>Esse campo precisa ser preenchido</span>}
                    {errors.name && errors.name.type === "maxLength" && <span>O nome tem que ser mais curto.</span>}
                  </div>

                  <div className="form-group">
                    <label>E-mail</label><br/>
                    <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                    <br/>
                    {errors.email && errors.email.type === "required" && <span>Esse campo precisa ser preenchido</span>}
                    {errors.email && errors.email.type === "pattern" && <span>Tem que ser um e-mail válido.</span>}
                  </div>

                  <div className="form-group">
                    <label>Senha</label><br/>
                    <input type="text" placeholder="Senha" {...register("password", {required: true, minLength: 8})} />
                    <br/>
                    {errors.password && errors.password.type === "required" && <span>Esse campo precisa ser preenchido</span>}
                    {errors.password && errors.password.type === "minLength" && <span>A senha precisa ter mais de 8 caracteres</span>}
                  </div>

            <label>Acessos:</label><br/>
            <Switch checked={state.admin} onChange={handleChange} name="admin" /> Administrativo <br/>

            <Switch checked={state.financeiro} onChange={handleChange} name="financeiro" /> Financeiro <br/>

            <Switch checked={state.reversa} onChange={handleChange} name="reversa" /> Reversa <br/>


              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                  >
                  Fechar
                </Button>
                <Button color="primary"  type="submit" >
                  Salvar
                </Button>
              </ModalFooter>
            </form>
      </Modal>
    </>
  );
}

export default ModalCreateUser;

import { Menu } from "@material-ui/core";
import {VFC} from 'react';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import { ThemeProvider } from "@mui/material";

type Props = {
  page: string
  mainAction: string
  action: string
}


const MainSidebar: VFC<Props>  = ({page, mainAction, action}) => {

  const AuthUser = useAuthUser()
  let roles: Array<string>;
  if (typeof AuthUser.claims['role'] == 'object'){
    roles = AuthUser.claims['role'];
  } else {
    roles = [];
  }

  // this.

// Menus
  let menuUser = (
    <li className="nav-item">
    <a href="/users" className={"nav-link "+ (page == "users"? "active": "")} >
      <i className="nav-icon fas fa-user-cog"/>
      <p>Usuários</p>
    </a>
  </li>);

  let menuFinanceiro = (
    <li className="nav-item">
    <a href="/financeiro" className={"nav-link "+ (page == "financeiro"? "active": "")}>
      <i className="nav-icon fas fa-landmark"/>
      <p> Financeiro </p>
    </a>
  </li>
  )

  let menuReversa=(
    <li className={"nav-item " + (page == "reversa"? "menu-is-opening menu-open": "")}>
    <a href="#" className="nav-link ">
        <i className="nav-icon fas  fa-exchange-alt" />
        <p>
          Reversa
          <i className="right fas fa-angle-left" />
        </p>
      </a>


      <ul className={"nav nav-treeview " +(page == "reversa"? "show": "")} >

      <li className="nav-item">
      <a href="#" className={"nav-link " + (mainAction == "cartao"? "ativo": "")}>
        <i className="nav-icon fas  fa-credit-card" />
        <p>
          Cartão
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/reversa/cartao?action=estorno" className={"nav-link " + (mainAction=="cartao" && action=="estorno"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Estorno</p>
          </a>
        </li>
      </ul>
    </li>

    <li className="nav-item">
      <a href="#" className={"nav-link " + (mainAction == "boleto"? "ativo": "")}>
        <i className="nav-icon fas  fa-barcode" />
        <p>
          Boleto
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/reversa/boleto?action=estorno" className={"nav-link " + (mainAction=="boleto" && action=="estorno"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Reembolso</p>
          </a>
        </li>
        {/* <li className="nav-item">
          <a href="/reversa/boleto?action=cancelamento" className={"nav-link " + (mainAction=="boleto" && action=="cancelamento"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Cancelamento</p>
          </a>
        </li> */}
      </ul>
    </li>


    <li className="nav-item">
      <a href="#" className={"nav-link " + (mainAction == "itaucard"? "ativo": "")}>
        <i className="nav-icon fas fa-money-check" />
        <p>
          Itaucard
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/reversa/itaucard?action=estorno" className={"nav-link " + (mainAction=="itaucard" && action=="estorno"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Reembolso</p>
          </a>
        </li>
        {/* <li className="nav-item">
          <a href="/reversa/boleto?action=cancelamento" className={"nav-link " + (mainAction=="boleto" && action=="cancelamento"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Cancelamento</p>
          </a>
        </li> */}
      </ul>
    </li>




    <li className="nav-item">
      <a href="#" className={"nav-link " + (mainAction == "cartaocert"? "ativo": "")}>
        <i className="nav-icon fas  fa-id-card" />
        <p>
          Cartão cert
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/reversa/cartaocert?action=estorno" className={"nav-link " + (mainAction=="cartaocert" && action=="estorno"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Reembolso</p>
          </a>
        </li>
      </ul>
    </li>


    <li className="nav-item">
      <a href="#" className={"nav-link " + (mainAction == "pix"? "ativo": "")}>
        <i className="nav-icon fas fa-money-bill" />
        <p>
          Pix
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/reversa/pix?action=estorno" className={"nav-link " + (mainAction=="pix" && action=="estorno"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Estorno</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/reversa/pix?action=cancelamento" className={"nav-link " + (mainAction=="pix" && action=="cancelamento"? "active":"")}>
            <i className="far fa-circle nav-icon" />
            <p>Cancelamento</p>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</li>
  )


  let menu =[];
  let nomeUser;
  for (var i = 0; i < roles.length; i++) {
    if (roles[i] == "admin") {
      menu.push(menuUser);
      menu.push(menuFinanceiro);
      menu.push(menuReversa);
      break;
    } else if (roles[i] == "financeiro"){
      menu.push(menuFinanceiro);
    } else if (roles[i] == "reversa"){
      menu.push(menuReversa);
    }
  }


  return (
    <aside className="main-sidebar sidebar-dark-gray elevation-4" style={{backgroundColor: '#00ff78', color:'#d8d8d8'}}>
      <a href="/maindash" className="brand-link">
        <img src="/cert.png" alt="cert Logo" className="brand-image img-circle elevation-3"/>
        <span className="brand-text font-weight-light">Marketplace 360</span>
      </a>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="/avatar.jpg" className="img-circle elevation-2" alt="User Image"/>
          </div>
          <div className="info">
            <a href="#" className="d-block">{AuthUser.displayName}</a>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">


            {menu}

          </ul>
        </nav>

      </div>
    </aside>
  );
}


export default withAuthUser<Props>()(MainSidebar);
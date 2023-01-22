type Props ={
  email: string,
  signOut: any,
}

const MainHeader = (props: Props)=>{
  const email = props.email
  const signOut = props.signOut
  return(
    <div style={{width: '100%'}}>
      { email ? (
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="/maindash" className="nav-link">Dashboard</a>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">

              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-bell"></i>
                  {/* <span className="badge badge-warning navbar-badge">1</span> */}
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-header"></span>
                  <div className="dropdown-divider"></div>
                  {/* <a href="#" className="dropdown-item">
                    <i className="fas fa-exclamation-triangle mr-2"></i> Falha de infra
                    <span className="float-right text-muted text-sm">3 mins</span>
                  </a> */}
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
              </li>


              <li className="nav-item">
                <a className="nav-link" href="/logout"  onClick={() => { signOut()}}>
                  <i className="fas fa-power-off"> Logout</i>
                </a>
              </li>

            </ul>
          </nav>
      ):(<p></p>)}
    </div>

  );
}

export default MainHeader
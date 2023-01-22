import Dashboard from './dashboard';
type Props ={
  email: string,
  signOut: any,
}

const HomeHeader = (props: Props)=>{
  const email = props.email
  const signOut = props.signOut
  return(
    <div style={{width: '100%'}}>
      { email ? (
          <nav className="navbar  navbar-white navbar-light">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/logout"  onClick={ () => { signOut();}}>
                  <i className="fas fa-power-off"> Logout</i>
                </a>
              </li>
            </ul>
          </nav>
      ):(<p></p>)}
    </div>

  );
}

export default HomeHeader
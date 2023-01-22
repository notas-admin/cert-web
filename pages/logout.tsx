import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { Player } from '@lottiefiles/react-lottie-player';

const Logout = () =>{
  return (
  <Container>
  <div>
  <Player
            autoplay
            loop
            src="https://assets1.lottiefiles.com/packages/lf20_xmdlmtgz.json"
            style={{ height: '600px', width: '600px' }}
          />

  </div>
  <div className="mx-auto center">
    <h3 style={{textAlign:"center"}}>Você foi deslogado com sucesso</h3>
    <div className="d-flex justify-content-center">
    <Button variant="contained" color="secondary"  className="mx-auto center" href="/login" >
      Voltar ao Login
    </Button>
    </div>
  </div>
</Container>
  )
}

export default Logout
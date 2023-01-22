import React from 'react';
import Container from '@material-ui/core/Container';
import { Player } from '@lottiefiles/react-lottie-player';


import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';
import FirebaseAuth from '../components/firebaseAuth';

const styles = {
  content: {
    padding: `8px 32px`,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
};

const Auth = () => (
  <div style={styles.content}>
    <Container>
      <div style={styles.textContainer}>
      <Player
                autoplay
                loop
                src="https://assets7.lottiefiles.com/private_files/lf30_m6j5igxb.json"
                style={{ height: '300px', width: '300px' }}
              />
      </div>
      <div>
        <FirebaseAuth />
      </div>
    </Container>
  </div>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({whenAuthed: AuthAction.REDIRECT_TO_APP})(Auth);

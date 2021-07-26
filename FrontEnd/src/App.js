import './App.css';
import ButtonAppBar from './UI/ButtonAppBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormUser from './alert/FormUser';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <ButtonAppBar />
        {/* <FormUser /> */}
      </Container>
    </>
  );
}

export default App;

import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Player } from '@lottiefiles/react-lottie-player';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

const UploadButtons = () => {


  const somaZero = (dado: Number) => {
    return (dado <= 9) ? '0' + dado : dado;
  };

  const reloadData = () => {
    let data = new Date();
    let data2 = new Date();
    let dataInicial = somaZero(data.getDate())  + "/" + (somaZero((data.getMonth() + 1))) + "/" + data.getFullYear()
    let dataFinal = somaZero(data2.getDate())  + "/" + (somaZero((data2.getMonth() + 1))) + "/" + data2.getFullYear()
    window.location.href="/financeiro/?research=true&sdatain="+dataInicial+"&sdatafi="+dataFinal;
  }

  let[shouldError, setShouldError] = useState(false);
  let[errorMessage, setErrorMessage]= useState("");
  let [shouldRender, setShouldRender] = useState(false);
  const handleChange = async (event:any) =>{

    try{
      setShouldRender(true);
      const formData = new FormData();
      let selectFile = event.target.files[0];
      formData.append(
        "file",
        selectFile,
        selectFile.name
      );
      let req = await axios.post("api/financeiro/api/v1/finances/chargerback/csv", formData).then(()=>{reloadData();}).catch((error) => {
        setShouldRender(false);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        };
        if(error.response.status == 500){
          setShouldError(true);
          setErrorMessage("Erro no Servidor");
        }
      });
    } catch(e){
      console.log(e);
    }
  }
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input accept=".csv" id="contained-button-file" onChange={(event)=>{handleChange(event)}} multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      { shouldError && <span>{errorMessage}</span>}
      { shouldRender &&
        <Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/private_files/lf30_88nb1f.json"
        style={{ height: '300px', width: '300px' }}
        />
      }
    </Stack>
  );
}

export default  UploadButtons;
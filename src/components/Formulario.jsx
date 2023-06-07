import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import { monedas } from '../data/monedas';
import useSelectMonedas from '../hooks/useSelectMonedas';

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`
const Formulario = ({setMonedas}) => {

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);
  const [ criptos, setCriptos ] = useState([]);
  const [ criptoMoneda, SelectCriptoMonedas ] = useSelectMonedas('Elige tu criptomoneda', criptos);
  const [ error, setError ] = useState(false);

  useEffect( () => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();
      //console.log(result.Data);
      const arrayCriptos = result.Data.map( c => { 
        //console.log(c.CoinInfo);
        const objeto = {
          id: c.CoinInfo.Name,
          nombre: c.CoinInfo.FullName
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    }
    consultarAPI();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if ( [moneda, criptoMoneda].includes('')) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({moneda, criptoMoneda});
  };

  return (
    <>
    { error && <Error>Todos los campos son obligatorios</Error> }
    <form 
      onSubmit={handleSubmit}>
        <SelectMonedas/>
        <SelectCriptoMonedas />
        <InputSubmit
         type="submit" 
         value="Cotizar"/>
    </form>
    </>
  )
};

export default Formulario;
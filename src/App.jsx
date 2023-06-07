import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ImagenCripto from './img/imagen-criptos.png';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

//
// npm install @emotion/react @emotion/styled
// install vscode-styled-components
//

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #ffffff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2f6;
    display: block;
    margin: 10px auto 0 auto;
  }`

const App = () => {
  
  const [ monedas, setMonedas ] = useState({});
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() => {    
    if (Object.keys(monedas).length > 0) 
    {
      const cotizarCripto = async () => {                
        try {
          setCargando(true);
          setResultado({});
          const { moneda, criptoMoneda } = monedas;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda},EUR`;
          //console.log(url);
          const response = await fetch(url);
          const result = await response.json();
          // Busca una propiedad en ese objeto que tenga el nombre de la criptomoneda y la moneda
          //console.log(result.DISPLAY[criptoMoneda][moneda]);
          setResultado(result.DISPLAY[criptoMoneda][moneda]);     
        } finally {
          setCargando(false);  
        }
      }
      cotizarCripto();
    }
  }, [monedas]);

  return (
      <Contenedor>
        <Imagen
          src={ImagenCripto}
          alt={"imagenes criptomonedas"}/>
          <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>
            <Formulario
              setMonedas={setMonedas}/>
             { cargando && <Spinner/>} 
             { resultado.PRICE &&
               <Resultado
                 resultado={resultado}/>}
        </div>
      </Contenedor>
  )
};

export default App;

import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import styled from 'styled-components';
import ObjectDetector from './Components/ObjectDetector';

const Main=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343541;
  width: 100%;
 min-height : 100vh;
  color: #ffff;
`

function App() {

  return <>
  <Main>
    <ObjectDetector/> 
  
  </Main>


  </>
}

export default App;

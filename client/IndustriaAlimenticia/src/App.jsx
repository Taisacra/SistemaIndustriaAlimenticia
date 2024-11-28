import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from "axios";
import FormularioUsuario from './FormularioUsuario';
import FormularioChamado from './FormularioChamado';

function TelaPrincipal() {
  return (
    <div>
      <h2>Inicio</h2>
      <button>
        <Link to="/cadastro">Cadastrar Usuário</Link>
      </button>
      <button>
        <Link to="/chamado">Abrir Chamado</Link>
      </button>
      <button>
        <Link to="/gerenciarchamado">Gerenciar Chamados</Link>
      </button>
    </div>
  );
}

function Chamados() {
  return (
    <div>
      <h1>Chamados</h1>
      <p>Aqui estará a lista ou funcionalidade de chamados.</p>
    </div>
  );
}

function gerenciarChamados() {
  return (
    <div>
      <h1>Chamados</h1>
      <p>Aqui estará a lista ou funcionalidade de chamados.</p>
    </div>
  );
}


function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [chamados, setChamados] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaPrincipal />} />
        <Route path="/cadastro" element={<FormularioUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}/>
        <Route path="/chamado" element={<FormularioChamado chamados={chamados} setChamados={setChamados}/>} />
        <Route path="/gerenciarChamados" element={<FormularioChamado chamados={chamados} setChamados={setChamados}/>} />
      </Routes>
    </Router>
  );
}

export default App

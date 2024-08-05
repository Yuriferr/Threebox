import { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "./firebase"; 

import Map from './components/Map/Map'

import './App.css'

export default function App() {
  const [urlModel, setUrlModel] = useState('');

  useEffect(() => {
    const fetchFileUrl = async () => {
      const storage = getStorage(app); // Passa o app inicializado aqui
      const fileRef = ref(storage, 'testeIfc/small.ifc'); // Ajuste o caminho conforme necessário
      try {
        const url = await getDownloadURL(fileRef);
        setUrlModel(url);
      } catch (error) {
        console.error("Erro ao obter a URL do arquivo:", error);
      }
    };

    fetchFileUrl();
  }, []);

  return (
    <div className='App'>
      <Map />
    </div>
  )
}

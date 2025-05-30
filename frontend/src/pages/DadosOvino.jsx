import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DadosOvino = () => {
  const { brinco } = useParams();
  const [dados, setDados] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `http://localhost:3000/rebanho/${brinco}`;
        const headers = { 'Content-Type': 'application/json' };
        const response = await fetch(url, headers);
        if (!response.ok) throw new Error("Não foi possível consultar os dados");
        const data = await response.json();
        setDados(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [brinco]);

  return (
    <div>
      {dados ?? "Indisponível"}
    </div>
  )
}

export default DadosOvino;
import PageTitle from '../../components/UI/PageTitle';
import CardEstadoSaude from '../../components/layout/cards/CardQuantidadeRaca';
import CardTiposFuncao from '../../components/layout/cards/CardTiposFuncao';
import CardTotalAnimais from '../../components/layout/cards/CardTotalAnimais';
import CardPesagensRecentes from '../../components/layout/cards/CardPesagensRecentes';
import CardQuantidadeSexo from '../../components/layout/cards/CardQuantidadeSexo';
import CardTarefasPendentes from '../../components/layout/cards/CardTarefasPendentes';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import api from '../../api/request';

const Dashboard = () => {
  // Gáfico Animais por finalidade
  const [pieData, setPieData] = useState([]);

  // Gráfico Saúde animal
  const [barLabels, setBarLabels] = useState([]);
  const [barSeries, setBarSeries] = useState([]);

  // Tabela Últimas pesagens
  const [ultimasPesagens, setUltimasPesagens] = useState([]);

  // Adicione este novo estado
  const [sexoData, setSexoData] = useState([]);
  const [tarefasPendentes, setTarefasPendentes] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await api.get('/dash');
        console.log('Dados do dashboard:', response.data);

        // Montar card de animais por finalidade
        setPieData(
          response.data.animaisPorFinalidade.map((item) => ({
            value: parseInt(item.count, 10),
            label: item.finalidade,
          })),
        );

        // Montar card quantiade por raça
        setBarLabels(response.data.quantidadePorRaca.map((item) => item.raca));
        setBarSeries([
          {
            data: response.data.quantidadePorRaca.map((item) =>
              parseInt(item.total, 10),
            ),
          },
        ]);

        // Montar card últimas pesagens
        setUltimasPesagens(response.data.ultimasPesagens);

        // Montar card quantidade por sexo
        setSexoData(response.data.quantidadePorSexo);

        // Montar card tarefas pendentes
        setTarefasPendentes(response.data.tarefasPendentes);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchPieData();
  }, []);

  // Esse usei no Total animais
  const [lineXLabels, setLineXLabels] = useState([1, 2, 3, 5, 8, 10]);
  const [lineSeries, setLineSeries] = useState([
    { data: [2, 5.5, 2, 8.5, 1.5, 5] },
  ]);

  return (
    <>
      <PageTitle title="Dashboard" />
      <Container fluid className="p-3">
        <Row className="g-3">
          {/* Card Total Animais */}
          <Col xs={12} md={6} lg={4}>
            <div className="h-100">
              <CardTotalAnimais xLabels={lineXLabels} series={lineSeries} />
            </div>
          </Col>

          {/* Card Animais por finalidade */}
          <Col xs={12} md={6} lg={4}>
            <div className="h-100">
              <CardTiposFuncao data={pieData} />
            </div>
          </Col>

          {/* Card Estado Saúde */}
          <Col xs={12} md={6} lg={4}>
            <div className="h-100">
              <CardEstadoSaude labels={barLabels} series={barSeries} />
            </div>
          </Col>

          {/* Card Quantidade por Sexo */}
          <Col xs={12} md={6} lg={4}>
            <div className="h-100">
              <CardQuantidadeSexo data={sexoData} />
            </div>
          </Col>

          {/* Card Pesagens Recentes */}
          <Col xs={12} lg={8}>
            <div className="h-100">
              <CardPesagensRecentes pesagens={ultimasPesagens} />
            </div>
          </Col>

          {/* Card Tarefas Pendentes */}
          <Col xs={12} lg={12}>
            <div className="h-100">
              <CardTarefasPendentes tarefas={tarefasPendentes} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

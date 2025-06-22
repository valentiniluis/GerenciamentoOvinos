import Sidebar from '../../components/layout/sidebar/Sidebar';
import PageTitle from '../../components/UI/PageTitle';

import CardEstadoSaude from '../../components/layout/cards/cardEstadoSaude';
import CardTiposFuncao from '../../components/layout/cards/cardTiposFuncao';
import CardTotalAnimais from '../../components/layout/cards/cardTotalAnimais';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import api from '../../api/request';

const Dashboard = () => {

  

  // Usei esse no gáfico Animais por finalidade
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await api.get('/dash');
        console.log('Dados do gráfico de pizza:', response.data);
        setPieData(response.data.map(item => ({
          value: parseInt(item.count, 10),
          label: item.finalidade,
        })));
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico de pizza:', error);
      }
    };

    fetchPieData();
  }, []);

  // Esse foi para o Saúde animal
  const [barLabels, setBarLabels] = useState(['group A', 'group B', 'group C']);
  const [barSeries, setBarSeries] = useState([
    { data: [4, 3, 5] },
    { data: [1, 6, 3] },
    { data: [2, 5, 6] },
  ]);

  // Esse usei no Total animais
  const [lineXLabels, setLineXLabels] = useState([1, 2, 3, 5, 8, 10]);
  const [lineSeries, setLineSeries] = useState([
    { data: [2, 5.5, 2, 8.5, 1.5, 5] },
  ]);

    const md = 2;
    const lg = 4;
  return (
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Dashboard" />
      <main className="col cont px-5">
        <PageTitle title="Dashboard" />
        <Container fluid className="p-4">
          <Row>
            <Col md={md} lg={lg}>
              <CardTotalAnimais xLabels={lineXLabels} series={lineSeries} />
            </Col>

            <Col md={md} lg={lg}>
              <CardTiposFuncao data={pieData} />
            </Col>

            <Col md={md} lg={lg}>
              <CardEstadoSaude labels={barLabels} series={barSeries} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;

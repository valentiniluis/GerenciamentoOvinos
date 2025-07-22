import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle.jsx';
import ErrorParagraph from '../../components/UI/ErrorParagraph.jsx';
import CardQuantidadeRaca from '../../components/layout/cards/CardQuantidadeRaca.jsx';
import CardTiposFuncao from '../../components/layout/cards/CardTiposFuncao.jsx';
import CardTotalAnimais from '../../components/layout/cards/CardTotalAnimais.jsx';
import CardPesagensRecentes from '../../components/layout/cards/CardPesagensRecentes.jsx';
import CardQuantidadeSexo from '../../components/layout/cards/CardQuantidadeSexo.jsx';
import CardTarefasPendentes from '../../components/layout/cards/CardTarefasAgendadas.jsx';
import '../../styles/dashboard.css';

import api from '../../api/request';
import { PermissionsContext } from '../../store/permissions-context.jsx';


const Dashboard = () => {
  const permissions = useContext(PermissionsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // Gáfico Animais por finalidade
  const [pieData, setPieData] = useState([]);

  // Gráfico Quantidade por Raça
  const [barLabels, setBarLabels] = useState([]);
  const [barSeries, setBarSeries] = useState([]);

  // Tabela Últimas pesagens
  const [ultimasPesagens, setUltimasPesagens] = useState([]);
  const [sexoData, setSexoData] = useState([]);
  const [tarefasPendentes, setTarefasPendentes] = useState([]);

  // gráfico Total animais
  const [lineXLabels, setLineXLabels] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);

  useEffect(() => {
    const fetchPieData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/dash');
        // Montar card de animais por finalidade
        setPieData(
          response.data.animaisPorFinalidade.map((item) => ({
            value: parseInt(item.count, 10),
            label: item.finalidade,
          })),
        );
        // Montar card quantiade por raça
        setBarLabels(response.data.quantidadePorRaca.map((item) => item.raca));
        setBarSeries([{ data: response.data.quantidadePorRaca.map((item) => +item.total) }]);
        // Montar card últimas pesagens
        setUltimasPesagens(response.data.ultimasPesagens);
        // Montar card quantidade por sexo
        setSexoData(response.data.quantidadePorSexo);
        // Montar card tarefas pendentes
        setTarefasPendentes(response.data.tarefasPendentes);
        // Montar card total animais
        const totalAnimais = response.data.totalAnimais;
        const meses = [...Array(12)].map((_, i) => String(i + 1).padStart(2, '0'));
        const mesesNumerico = [...Array(12)].map((_, i) => i + 1);
        const anos = [...new Set(totalAnimais.map((item) => item.ano))];
        const series = anos.map((ano) => {
          return {
            label: ano,
            data: meses.map((mes) => {
              const found = totalAnimais.find(
                (item) => item.ano === ano && item.mes === mes,
              );
              return found ? parseInt(found.total, 10) : 0;
            }),
          };
        });
        setLineXLabels(mesesNumerico); // [1, 2, ..., 12]
        setLineSeries(series);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Falha ao extrair dados');
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchPieData();
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      {(isLoading)
        ? (
          <div className="spinner-container">
            <Spinner variant='primary' animation='border' role='status' />
          </div>
        )
        : (errorMessage)
          ? <ErrorParagraph error={{ message: errorMessage }} />
          : (
            <Container fluid className="p-3">
              <Row className="g-3">
                <Col xs={12} md={6} xxl={4}>
                  <div className="h-100">
                    <CardTotalAnimais
                      xLabels={lineXLabels}
                      series={lineSeries}
                      permissao={permissions.perm_visual_rebanho}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} xxl={4}>
                  <div className="h-100">
                    <CardTiposFuncao
                      data={pieData}
                      permissao={permissions.perm_visual_rebanho}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} xxl={4}>
                  <div className="h-100">
                    <CardQuantidadeRaca
                      labels={barLabels}
                      series={barSeries}
                      permissao={permissions.perm_visual_rebanho}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} xxl={4}>
                  <div className="h-100">
                    <CardQuantidadeSexo
                      data={sexoData}
                      permissao={permissions.perm_visual_rebanho}
                    />
                  </div>
                </Col>
                <Col xs={12} xxl={8}>
                  <div className="h-100">
                    <CardPesagensRecentes
                      pesagens={ultimasPesagens}
                      permissao={permissions.perm_visual_rebanho}
                    />
                  </div>
                </Col>
                <Col xs={12} lg={12}>
                  <div className="h-100">
                    <CardTarefasPendentes
                      tarefas={tarefasPendentes}
                      permissao={permissions.perm_visual_calendario}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          )}
    </>
  )
};

export default Dashboard;

import { useEffect, useState, useContext } from 'react';
import PageTitle from '../../components/UI/PageTitle.jsx';
import EventModal from '../../components/layout/modal/EventModal.jsx';
import ErrorPage from '../ErrorPage.jsx';
import CustomAlert from '../../components/UI/CustomAlert.jsx';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocales from '@fullcalendar/core/locales/pt-br';
import InteractionPlugin from '@fullcalendar/interaction';

import { PermissionsContext } from '../../store/permissions-context.jsx';
import '../../styles/calendar.css';
import api from '../../api/request.js';


const Calendar = () => {
  const permissions = useContext(PermissionsContext);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get('/tarefas');
        const eventosData = response.data.map(evento => ({
          title: evento.tarefa_nome,
          start: evento.data_criacao,
          allDay: true
        }));
        setEvents(eventosData);
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Falha ao carregar eventos');
      }
    };
    fetchEvents();
  }, []);

  if (!permissions.perm_visual_calendario) return <ErrorPage title="Usuário não autorizado" />

  const handleDateClick = (info) => {
    if (!permissions.perm_alter_calendario) return;
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = ({ titulo }) => {
    setEvents((prev) => [
      ...prev,
      {
        title: titulo,
        start: selectedDate,
        allDay: true
      },
    ]);
    setShowModal(false);
  };

  return (
    <section className="calendario-container">
      <PageTitle title="Tarefas agendadas" />
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, InteractionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          locale={ptBrLocales}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          eventColor="#009099"
          events={events}
          dateClick={handleDateClick}
        />
      </div>
      <EventModal
        show={showModal}
        onClose={handleClose}
        onSave={handleSave}
        initialDate={selectedDate}
      />
      <CustomAlert variant="danger" message={errorMessage} onClose={() => setErrorMessage(null)} />
    </section>
  );
};

export default Calendar;

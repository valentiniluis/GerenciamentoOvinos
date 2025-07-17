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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get('/tarefas');
        const eventosData = response.data.map(evento => ({
          title: evento.tarefa_nome,
          start: evento.data_criacao,
          allDay: true,
          descricao: evento.descricao || 'teste',
        }));
        console.log(eventosData);
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
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    if (!permissions.perm_alter_calendario) return;
    setSelectedDate(info.event.startStr);
    setSelectedEvent({
      tarefa_nome: info.event.title,
      data_criacao: info.event.startStr,
      descricao: info.event.extendedProps?.descricao || '',
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async ({ titulo, descricao }) => {
    if (selectedEvent) {
      // Editar tarefa existente
      try {
        await api.put(`/tarefas`, {
          tarefa_nome_original: selectedEvent.tarefa_nome,
          data_criacao_original: selectedEvent.data_criacao,
          tarefa_nome: titulo,
          descricao,
          data_criacao: selectedDate,
          usuario_email: 'admin@admin.com'
        });
        setEvents((prev) => prev.map(ev =>
          ev.title === selectedEvent.tarefa_nome && ev.start === selectedEvent.data_criacao
            ? { ...ev, title: titulo, start: selectedDate }
            : ev
        ));
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Falha ao editar tarefa');
      }
    } else {
      // Criar nova tarefa
      try {
        await api.post('/tarefas', {
          tarefa_nome: titulo,
          descricao,
          data_criacao: selectedDate,
          usuario_email: 'admin@admin.com'
        });
        setEvents((prev) => [
          ...prev,
          {
            title: titulo,
            start: selectedDate,
            allDay: true
          },
        ]);
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Falha ao criar tarefa');
      }
    }
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
          eventClick={handleEventClick}
        />
      </div>
      <EventModal
        show={showModal}
        onClose={handleClose}
        onSave={handleSave}
        initialDate={selectedDate}
        initialEvent={selectedEvent}
      />
      <CustomAlert variant="danger" message={errorMessage} onClose={() => setErrorMessage(null)} />
    </section>
  );
};

export default Calendar;

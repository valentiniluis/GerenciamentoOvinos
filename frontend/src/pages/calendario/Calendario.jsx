import { useLoaderData, useNavigation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import PageTitle from '../../components/UI/PageTitle.jsx';
import EventModal from '../../components/layout/modal/EventModal.jsx';
import ErrorPage from '../ErrorPage.jsx';
import ApiAlert from '../../components/UI/ApiAlert.jsx';
import { PermissionsContext } from '../../store/permissions-context.jsx';
import '../../styles/calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocales from '@fullcalendar/core/locales/pt-br';
import InteractionPlugin from '@fullcalendar/interaction';

import api from '../../api/request.js';


const Calendar = () => {
  const permissions = useContext(PermissionsContext);
  const [modalState, setModalState] = useState({ show: false, date: null, event: null });
  const data = useLoaderData();
  const navigation = useNavigation();

  const isLoading = (navigation.state === 'loading');
  let eventsData = (data?.length > 0) ? [...data] : [];
  if (data?.length >= 0) {
    eventsData = eventsData.map(evento => ({
      title: evento.tarefa_nome,
      start: evento.data_criacao,
      allDay: true,
      descricao: evento.descricao,
    }));
  }

  if (!permissions.perm_visual_calendario) return <ErrorPage title="Usuário não autorizado" />
  if (data?.isError) return <ErrorPage title={data.message} />

  const handleDateClick = (info) => {
    if (!permissions.perm_alter_calendario) return;
    setModalState({ show: true, date: info.dateStr, event: null });
  };

  const handleEventClick = (info) => {
    if (!permissions.perm_alter_calendario) return;
    setModalState({
      show: true, date: info.event.startStr, event: {
        tarefa_nome: info.event.title,
        data_criacao: info.event.startStr,
        descricao: info.event.extendedProps?.descricao || '',
      }
    });
  };

  const handleClose = () => setModalState({ show: false, date: null, event: null });

  return (
    <section className="calendario-container">
      <PageTitle title="Tarefas agendadas" />
      {isLoading ? (
        <div className='spinner-container'>
          <Spinner variant='primary' animation='border' role='status' />
        </div>
      ) : (
        <>
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
              events={eventsData}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />
          </div>
          <EventModal
            show={modalState.show}
            onClose={handleClose}
            onSave={handleClose}
            date={modalState.date}
            event={modalState.event}
          />
          <div className="w-75 m-auto">
            <ApiAlert />
          </div>
        </>
      )}
    </section>
  );
};

export default Calendar;


export const loader = async () => {
  try {
    const response = await api.get('/tarefas');
    return response.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao carregar tarefas'
    }
  }
}


export const action = async ({ request }) => {
  try {
    const { method } = request;
    console.log(method);
    const formData = await request.formData();
    const submitData = Object.fromEntries(formData.entries());
    let result;
    if (method === 'POST') result = await api.post('/tarefas', submitData);
    else if (method === 'PUT') result = await api.put('/tarefas', submitData);
    return result.data;
  } catch (err) {
    return {
      isError: true,
      message: err.response?.data?.message || 'Falha ao atualizar tarefas'
    };
  }
}
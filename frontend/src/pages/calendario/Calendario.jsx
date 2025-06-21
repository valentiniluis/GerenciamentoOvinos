import { useState } from 'react';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import PageTitle from '../../components/UI/PageTitle';
import EventModal from '../../components/layout/modal/EventModal';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocales from '@fullcalendar/core/locales/pt-br';
import InteractionPlugin from '@fullcalendar/interaction';

import '../../styles/calendar.css';
import { all } from 'axios';

const Calendar = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = ({ titulo }) => {
    setEventos((prev) => [
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
    <div className="row m-0">
      <Sidebar user="Luís" currentPage="Calendário" />
      <main className="col cont px-5 calendario-container">
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
            events={eventos}
            dateClick={handleDateClick}
          />
        </div>

        <EventModal
          show={showModal}
          onClose={handleClose}
          onSave={handleSave}
          initialDate={selectedDate}
        />
      </main>
    </div>
  );
};

export default Calendar;

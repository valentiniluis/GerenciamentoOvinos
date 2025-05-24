import React from "react";
import '../styles/sidebar.css'
// import '../styles'

const SidebarHeader = ({ user, profilePicture }) => {
  return (
    <div className="row d-flex justify-content-center">
      <img className="profile-picture-one"
        src={profilePicture} alt="Foto de Perfil"/>
      <p className="text-center">{user}</p>
    </div>
  );
}

const SidebarFooter = ({ profilePicture }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-6 d-flex justify-content-center align-items-center gap-4">
        <img className="profile-picture-two" src={profilePicture} alt="Foto de Perfil do Usuário" />
        <p>Meu Perfil</p>
      </div>
      <div className="col-2">
        <img className="option-icon" src="./logout.svg" alt="Ícone de Logout"/>
      </div>
    </div>
  );
}

const NavOption = ({ name, icon }) => {
  return (
    <div className="d-flex gap-2 py-2">
      <img className='option-icon' src={icon} alt={`${name} Sidebar Icon`} />
      <p className="h-100 option-text">{name}</p>
    </div>
  );
}

const Sidebar = ({ user }) => {
  return (
    <nav className="cont bg-white">
      <SidebarHeader user={user} profilePicture='./Group_2.png' />
      <div className="row">
        <div className="col-5"></div>
        <div className="col">
          <NavOption name='Dashboard' icon='./dash_icon.svg' />
          <NavOption name='Rebanho' icon='./sheep_icon.svg' />
          <NavOption name='Calendário' icon='./calendar.svg' />
          <NavOption name='Relatórios' icon='./report.svg' />
          <NavOption name='Usuários' icon='./people_icon.svg' />
        </div>
      </div>
      <SidebarFooter profilePicture={'./Group_2.png'} />
    </nav>
  );
}

const CadastroRebanho = () => {
  return (
    <div>
      <Sidebar user='Emerson'/>
    </div>
  );
}

export default CadastroRebanho
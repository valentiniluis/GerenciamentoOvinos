import { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/UI/PageTitle';
import CustomTable from '../../components/layout/table/CustomTable';
import FiltroGrupos from '../../components/layout/forms/grupos/FiltroGrupos';
import ErrorParagraph from '../../components/UI/ErrorParagraph';
import ErrorPage from '../ErrorPage';
import { PermissionsContext } from '../../store/permissions-context';
import editIcon from '/edit_icon.svg';
import editDisabledIcon from '/edit_disabled.svg';


const ListagemGrupos = () => {
  const permissions = useContext(PermissionsContext);
  const [groupsData, setGroupsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const updateGroupsData = useCallback(data => {
    if (data?.isError) return setErrorMessage(data.message);
    let newData = [...data];
    if (permissions.perm_alter_usuario_grupo) {
      newData = data.map(group => {
        const isAdmin = (group.nome === 'Administrador');
        const linkPath = (isAdmin) ? null : '/grupo/' + group.nome;
        const linkIcon = (isAdmin) ? editDisabledIcon : editIcon;
        return {
          ...group, editar: (
            <Link to={linkPath}>
              <img src={linkIcon} alt="Ícone de editar grupo" className='edit-icon' />
            </Link>
          )
        }
      })
    }
    setGroupsData(newData);
  }, [permissions.perm_alter_usuario_grupo]);

  if (!permissions.perm_visual_grupos) return <ErrorPage title="Usuário não autorizado" />;

  const SCHEMA = [
    ['nome', 'Nome do Grupo'],
    ['descricao', 'Descrição'],
    ['data_criacao', 'Data de Criação'],
    ['membros', 'Nº de Membros']
  ];

  if (permissions.perm_alter_usuario_grupo) SCHEMA.push(['editar', 'Editar']);

  return (
    <>
      <PageTitle title="Grupos de Usuários" />
      {errorMessage ? <ErrorParagraph error={{ message: errorMessage }} />
        : (
          <>
            <section className="form-cont flex-center">
              <FiltroGrupos updateGroupsData={updateGroupsData} />
            </section>
            <div className="row py-3">
              {groupsData.length > 0
                ? <CustomTable schema={SCHEMA} data={groupsData} uniqueCol="nome" /> 
                : <ErrorParagraph error={{ message: 'Nenhum grupo cadastrado' }} />
              }
            </div>
          </>
        )}
    </>
  );
};

export default ListagemGrupos;

import { Link } from 'react-router-dom';
import returnIcon from '/return_icon.svg';


const ReturnLink = ({ path }) => {
  return (
    <Link to={path} title="Voltar">
      <img src={returnIcon} alt="Ícone de retorno" className='return-icon' />
    </Link>
  );
}


export default ReturnLink;
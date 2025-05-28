import Table from 'react-bootstrap/Table';

const CustomTable = ({ schema, data, uniqueCol }) => {
  const columns = Object.keys(schema);

  return (
    <Table bordered className='text-center'>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={schema[column]}>{schema[column]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(obj => (
          <tr key={obj[uniqueCol]}>
            {columns.map(column => (
              <td key={`${obj[uniqueCol]} ${column}`}>{obj[column] ?? 'Não Encontrado'}</td>
            ))}
          </tr>
        ))}
      </tbody>

    </Table>
  )
}

export default CustomTable;
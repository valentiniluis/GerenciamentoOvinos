import Table from 'react-bootstrap/Table';

const CustomTable = ({ schema, data, uniqueCol }) => {
  const columns = schema.map(column => column[0]);

  return (
    <Table bordered className='text-center'>
      <thead>
        <tr>
          {schema.map(column => (
            <th key={column[1]}>{column[1]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(obj => (
          <tr key={obj[uniqueCol]}>
            {columns.map(column => (
              <td key={`${obj[uniqueCol]} ${column}`}>{obj[column] ?? 'Não Há'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default CustomTable;
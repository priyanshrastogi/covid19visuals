import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function CovidTable(props) {

  const [selectedRow, setSelectedRow] = React.useState(null);
  
  let columns = [
    {
      Header: props.headerColumn,
      accessor: props.headerAccessor,
    },
    {
      Header: 'Confirmed',
      accessor: 'confirmed',
      sortDescFirst: true
    },
    {
      Header: 'Deaths',
      accessor: 'deaths',
      sortDescFirst: true
    },
    {
      Header: 'Recovered',
      accessor: 'recovered',
      sortDescFirst: true
    },
    {
      Header: 'Active',
      accessor: 'active',
      sortDescFirst: true
    },
  ]

  if(props.isGlobalTable) {
    columns.push({Header: 'Infected / Mil Pop', accessor: 'infPopRatio', sortDescFirst: true});
    columns.push({Header: 'Deaths / Mil Pop', accessor: 'deathsPopRatio', sortDescFirst: true});
    columns.push({Header: 'Code', accessor: 'code'});
  }

  columns = React.useMemo(() => columns, []);
  const data = React.useMemo(() => props.data, []);
  const initialState = {sortBy: [{id: 'confirmed', desc: true}], pageIndex: 0, pageSize: props.pageSize, hiddenColumns: ['code']};

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    useSortBy,
    usePagination
  )

  const handleRowClick = (row) => {
    setSelectedRow(row[props.headerAccessor]);
    if(props.isGlobalTable)
      props.history.push(`/${row.code.toLowerCase()}`);
  }
  
  return (
    <div className="table-container">
      <table className="table table is-hoverable is-fullwidth" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th className="is-size-7-mobile has-background-grey-dark has-text-white" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr onClick={() => handleRowClick(row.values)} {...row.getRowProps()} className={selectedRow === row.values[props.headerAccessor] ? 'is-selected' : ''}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="is-size-7-mobile">{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <div className="has-text-centered">
        <button className="button is-small" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className="button is-small" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className="button is-small" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className="button is-small" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        {' '}
        <span className="select is-small">
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  )
} 

export default withRouter(CovidTable);

CovidTable.propTypes = {
  headerColumn: PropTypes.string.isRequired,
  headerAccessor: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  isGlobalTable: PropTypes.bool
}

CovidTable.defaultProps = {
  pageSize: 10,
  isGlobalTable: false
}
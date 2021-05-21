import { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'

import _ from "lodash"
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Box, Center, Heading, Link, Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import useSWR from 'swr'
import { timeFormat } from 'd3-time-format';

const fetcher = url => fetch(url).then(r => r.json())

export function RankingTable({  url, columns, sortByField}) {
  const format = timeFormat('%d-%m-%Y');
  const { data, error } = useSWR(url, fetcher);

  const tableData = useMemo(
    () => {
      return data ? data['rows'] : _.times(6, _.constant({}))
    },
    [data],
  )

  const tableColumns = useMemo(
    () => {
      return columns
    },
    [columns],
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
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
      columns: tableColumns,
      data: tableData,
      initialState: {
        pageIndex: 0,
        pageSize: 5,
        sortBy:
          [
            {
              id: sortByField,
              desc: true
            }
          ]
      },
    },
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <VStack spacing={5} py={5}>
        <Center>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <FaArrowLeft />
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            <FaArrowRight />
          </Button>
        </Center>
        <Text>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </Text>
      </VStack>
    </>
  )
}


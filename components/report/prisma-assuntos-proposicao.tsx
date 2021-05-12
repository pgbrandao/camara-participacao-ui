import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { PrismaTable } from "./prisma-table";

const fetcher = url => fetch(url).then(r => r.json())

export const PrismaAssuntosProposicao = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  const columns = [
    {
      Header: "Assunto",
      id: "assunto",
      accessor: row => row['assunto'],
      // Cell: props => {
      //   return (<Link fontSize="md" href={`/index-details/${networkName}/${props.value[1]}`}>{props.value[0]}</Link>)
      // },
      // sortType: compare
    },
    {
      Header: "Demandas",
      id: "demandas",
      accessor: row => row['count'],
      // Cell: props => {
      //   return <Text fontSize="sm">{NumberToDollar(props.value)}</Text>
      // },
      isNumeric: true,
    },
  ]
  
  return (
    <>
      <PrismaTable
        data={data ? data['prisma_assuntos_proposicao'] : data}
        columns={columns}
      />
    </>
  );
}

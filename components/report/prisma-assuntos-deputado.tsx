import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { PrismaTable } from "./prisma-table";
import { ReportSubTitle } from "./report-subtitle";

const fetcher = url => fetch(url).then(r => r.json())

export const PrismaAssuntoDeputado = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  const columns = [
    {
      Header: "Assunto",
      id: "assunto",
      accessor: row => row['assunto'],
    },
    {
      Header: "nº",
      id: "demandas",
      accessor: row => row['count'],
      isNumeric: true,
    },
  ]
  
  return (
    <>
      <PrismaTable
        data={data ? data['prisma_assuntos_deputado'] : data}
        columns={columns}
        title="Deputados"
      />
    </>
  );
}

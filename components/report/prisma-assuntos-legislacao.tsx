import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { PrismaTable } from "./prisma-table";
import { ReportSubTitle } from "./report-subtitle";

const fetcher = url => fetch(url).then(r => r.json())

export const PrismaAssuntosLegislacao = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/api/relatorio-consolidado/?year=${year}`, fetcher);

  const columns = [
    {
      Header: "Assunto",
      id: "assunto",
      accessor: row => row['assunto'],
    },
    {
      Header: "n",
      id: "demandas",
      accessor: row => row['count'],
      isNumeric: true,
    },
  ]
  
  return (
    <>
      <PrismaTable
        data={data ? data['prisma_assuntos_legislacao'] : data}
        columns={columns}
        title="Legislação"
      />
    </>
  );
}

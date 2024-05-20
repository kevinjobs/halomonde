import React from 'react';
import Tr from './Tr';
import Td from './Td';
import Th from './Th';
import Thead from './Thead';
import Tbody from './Tbody';
import style from './Table.module.less';

export interface TableData {
  head: string[];
  body: React.ReactNode[][];
}

export interface TableProps {
  data: TableData;
  children?: React.ReactNode;
}

export default function Table(props: TableProps) {
  const { data, children } = props;

  if (data) {
    return (
      <table className={style.table}>
        <DataTable data={data} />
      </table>
    );
  }
}

function DataTable({ data }: { data: TableData }) {
  const { head, body } = data;

  const renderHead = () => {
    return (
      <Tr>
        {head.map((item) => {
          return <Th>{item}</Th>;
        })}
      </Tr>
    );
  };

  const renderBody = () => {
    return body.map((item) => {
      return (
        <Tr>
          {item.map((item) => {
            return <Td>{item}</Td>;
          })}
        </Tr>
      );
    });
  };

  return (
    <>
      <Thead>{renderHead()}</Thead>
      <Tbody>{renderBody()}</Tbody>
    </>
  );
}

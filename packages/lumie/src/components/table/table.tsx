import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';

const TableStyled = styled.div`
  width: fit-content;
  background-color: #fff;
  border: 1px solid ${COLOR_MAP.white4};
  tbody,thead {
    td,th {
      padding: 8px;
      border-bottom: 1px solid ${COLOR_MAP.white4};
      overflow-x: hidden;
    }
  }
  thead {
    position: sticky;
    top: -16px;
    background-color: ${COLOR_MAP.white4};
    z-index: 2;
  }
  tbody {
    tr {
      td {
        text-align: center;
        span {
          overflow: hidden;
          display: inline-block;
          height: 100%;
          line-height: normal;
          text-overflow: ellipsis;
        }
      }
    }
    tr:hover {
      background-color: ${COLOR_MAP.white3};
    }
  }
`;

export interface TableHead {
  field: string,
  name: string,
  width?: number,
  height?: number,
}

export interface TableProps {
  heads: TableHead[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[],
}


export function Table(props: TableProps): React.ReactElement {
  const { heads, data, } = props;
  const [widthList, setWidthList] = React.useState<Array<number | string>>();
  const [heightList, setHeightList] = React.useState<Array<number | string>>();

  const itemWidths: Array<number | string> = [];
  const itemHeights: Array<number | string> = [];

  const renderThs = (item: TableHead) => {
    const itemWidth: number | null = item.width;
    const itemHeight: number | null = item.height;

    if (itemWidth !== null) itemWidths.push(itemWidth);
    if (itemHeight !== null) itemHeights.push(itemHeight);

    return (
      <th key={item.field} style={{display: itemWidth !== 0 ? '' : 'none'}}>
        <span style={{ width: itemWidth }}>{item.name}</span>
      </th>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTrs = (item: any, i: number) => {
    const hds: string[] = heads.map(h => h.field);
    const trs = [];
    for (const i in item) {
      const foundIndex = hds.indexOf(i);
      // console.log(foundIndex, item[i]);
      foundIndex !== -1
        ? trs[foundIndex] = item[i]
        : trs[0] = '数据错误请仔细检查';
    }
    return (
      <tr key={i} data-key={i}>
        {
          trs.map((t, index) => (
            <td key={index} data-key={index} style={{display: widthList[index] !== 0 ? '' : 'none'}}>
              <span style={{width: widthList[index], height: heightList[index]}}>
                {t}
              </span>
            </td>
          ))
        }
      </tr>
    );
  };

  React.useEffect(() => {
    // console.log(itemWidths);
    if (itemWidths.length === heads.length) {
      // 如果已经遍历完列表头，则将对应的宽度数据写入
      setWidthList(itemWidths);
      setHeightList(itemHeights);
    }
  }, [itemWidths.length]);

  return (
    <TableStyled className="mint-table">
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            { heads.map(renderThs) }
          </tr>
        </thead>
        <tbody>{widthList && data.map(renderTrs)}</tbody>
      </table>
    </TableStyled>
  );
}

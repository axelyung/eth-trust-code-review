import React from 'react';
import { Trade } from '../hooks/trades';

const TableRow = function ({ id, exchange, quantity, price }: Trade) {
  return (
    <tr key={id}>
      <td className="px-6 py-4 whitespace-nowrap">{exchange}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {quantity.toLocaleString(undefined, {
          maximumFractionDigits: 8,
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {price.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
};

export default TableRow;

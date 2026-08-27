import React from 'react';
import './Table.css';

export default function Table({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found',
  className = ''
}) {
  return (
    <div className={`table-responsive ${className}`}>
      <table className="app-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={col.key || idx} style={{ width: col.width, textAlign: col.align || 'left' }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={row[keyField] || rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={col.key || colIdx} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row[col.key], row, rowIdx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

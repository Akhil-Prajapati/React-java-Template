import React from 'react';

const Table = ({ data, openUpdateModel, handleDelete }: any) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 mt-1.5">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item: any, index: any) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.password}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => openUpdateModel(item)} className="text-indigo-600 hover:text-indigo-900">Update</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

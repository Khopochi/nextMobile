"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './ordertable.scss'
import { useRouter } from 'next/navigation';

function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  }

  



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function OrderTable({rowss}) {
    const router = useRouter()
    const viewCart = (id) => {
        router.push("/cartview/"+id)
    }
    
    const columns = [
      {
        field: 'view',
        headerName: 'View',
        width: 110,
        renderCell: (params)=> (
            <span className='view' onClick={()=>viewCart(params.row._id)}>Click to view</span>
        )
      },
      { field: 'orderid', headerName: 'Order ID', width: 150, },
      // { field: 'numberofgoods', headerName: 'Goods', width: 90, type:'number' },
      // {
      //   field: 'amount',
      //   headerName: 'Amount',
      //   type: 'number',
      //   width: 130,
      // },
      {
        field: 'date',
        headerName: 'Date',
        width: 200,
        valueGetter: (params) => formatDateTime(params.row.createdAt),
      },
      
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => (
            <span className={params.row.status}>
              {params.row.status}
            </span>
          )
      },
    
    ];
    
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rowss}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
}
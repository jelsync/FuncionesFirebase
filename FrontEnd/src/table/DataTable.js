import React, { useRef, useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import FormUser from '../alert/FormUser';
import {
   useStyles, Button, IconButton
} from "./stylesUserTable";

const DataTable = () => {
  const [open, setOpen] = useState(false);

  const cerrar = () => {
    console.log('cerrar');
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 190 },
    { field: 'age', headerName: 'Age', type: 'number', width: 102 },
    { field: 'address', headerName: 'Address', width: 190 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (id) => (
        <strong>
          {id.value.abrir()}
          <IconButton
            aria-label="delete"
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => abrir(e.id)}
          >
            <EditOutlinedIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => cerrar()}>
            <DeleteOutlineOutlinedIcon fontSize="small" color="secondary" />
          </IconButton>
        </strong>
      ),
    },
  ];
  const [data, setData] = useState([]);

  const rows =
    data.map((item, i = 1) => (
      {
        id: i + 1,
        name: item.name,
        lastName: item.lastName,
        email: item.email,
        age: item.age,
        address: item.address,
        function: item.id
      }
    ));

  const classes = useStyles();

  useEffect(() => {
    obtenerData();
    console.log('useEffect GetUser');

  }, []);

  const createUser = () => {
    
    console.log('click');
  }

  const obtenerData = async () => {
    const getUser = async () => {
      const resp = await fetch(`http://localhost:5000/api-appland-22cd0/us-central1/app/api/user`);
      const body = await resp.json();
      setData(body.data);
    }
    getUser();
   
  }



  return (
    <>
      <Button onClick={() => createUser()} variant="contained" color="secondary" className={classes.create}>
        New User
      </Button>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          pageSize={10}
          disableColumnMenu={true}
          density={'compact'}
          disableSelectionOnClick={true}
          className={classes.tableContainer}
        // actions={[
        //   {
        //     icon: 'edit',
        //     onClick:(event, rowData)=>console.log(rowData.id)
        //   }
        // ]}
        />
      </div>
      <FormUser />
    </>
  );
}

export default DataTable

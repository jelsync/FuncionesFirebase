import React, { useEffect, useRef, useState } from 'react';
import MaterialTable from "material-table";

import FormUser from '../alert/FormUser';
import Delete from '../alert/Delete';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useForm } from '../hooks/useForm';

const Table = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [recarga, setRecarga] = useState(false);
    const [values, handleInputChange, setValues, reset] = useForm({
        name: '',
        lastName: '',
        email: '',
        address: '',
        age: ''

    });
    const columns = [
        {
            field: 'id', title: 'Id', cellStyle: {
                width: 40,
                minWidth: 10
              },
              headerStyle: {
                width: 60,
                minWidth: 60, 
              }
        },
        { field: 'name', title: 'Name', width: '1%', },
        { field: 'lastName', title: 'Last Name', },
        {
            field: 'email', title: 'Email', cellStyle: {
                width: 30,
                minWidth: 30,
            },
            headerStyle: {
                width: 30,
                minWidth: 40,
            }
        },
        { field: 'age', title: 'Age', type: 'numeric', },
        { field: 'address', title: 'Address', },
    ];

    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
        console.log('useEffect GetUser');
        setRecarga(true);
    }, [recarga]);

    const getUser = async () => {
        const resp = await fetch(`http://localhost:5000/api-appland-22cd0/us-central1/app/api/user`);
        const body = await resp.json();
        setUser(body.data);
        // setBandera(false);
    }
    const data =
        user.map((item, i = 1) => (
            {
                id: i + 1,
                idUser: item.id,
                name: item.name,
                lastName: item.lastName,
                email: item.email,
                age: item.age,
                address: item.address,
            }
        ));

    const edit = (id) => {
        setIdUser(id);
        setOpen(true);
    }

    const delet = (id) => {
        setOpenDelete(true);
        setIdUser(id);
        console.log(id);
    }
    const createUser = () => {
        reset();
        setOpen(true);
    }

    return (
        <div>
            <MaterialTable
                title="Data User"
                columns={columns}
                data={data}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        Tooltip: 'Edit User',
                        onClick: (e, rowData) => edit(rowData.idUser)
                    },
                    {
                        icon: 'delete',
                        Tooltip: 'Delete User',
                        onClick: (e, rowData) => delet(rowData.idUser)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: () => createUser()
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    // cellStyle:
                    // {
                    //     // width: 100,
                    //     // minWidth: 125
                    // },
                    // headerStyle: {
                    //     width: 100,
                    //     minWidth: 50
                    // },
                }}

            />
            <FormUser open={open} setOpen={setOpen} setIdUser={setIdUser} idUser={idUser} setRecarga={setRecarga} />
            <Delete openDelete={openDelete} setOpenDelete={setOpenDelete} setIdUser={setIdUser} idUser={idUser} setRecarga={setRecarga} />
        </div>
    )
}

export default Table

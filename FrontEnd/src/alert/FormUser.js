import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from '../hooks/useForm';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const FormUser = ({ open, setOpen, setIdUser, idUser, setRecarga }) => {
    const classes = useStyles();
    // const [open, setOpen] = useState(false);

    // console.log(refOpen);
    // console.log(setOpen(refOpen));
    const [values, handleInputChange, setValues, reset] = useForm({
        name: '',
        lastName: '',
        email: '',
        address: '',
        age: ''

    });
    const { name, lastName, email, address, age } = values;

    useEffect(() => {
        console.log('Effect getId', idUser);
        const getUserId = async () => {
            const resp = await fetch(`http://localhost:5000/api-appland-22cd0/us-central1/app/api/user/${idUser}`);
            const body = await resp.json();
            setValues(body);
        };
        getUserId();
    }, [idUser])
    // }, [setId])

    const handleConfirm = async () => {
        // // console.log(values);
        // console.log(idUser);
        
        const resp = await fetch(`http://localhost:5000/api-appland-22cd0/us-central1/app/api/user/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
            
        });
        setOpen(false);
        setRecarga(false);
        // reset();
        // console.log(resp);
        // setIdUser('');
    };

    const addUser = async () => {
        const resp = await fetch(`http://localhost:5000/api-appland-22cd0/us-central1/app/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        setRecarga(false);
        setOpen(false);
        reset();
        // console.log(values);
    }
    // const handleClose = () => {
    //     setOpen(false);
    //     // setId('');
    //     reset();

    // };
    // console.log(setId);


    const handleClose = () => {
        setOpen(false);
        reset();
        setIdUser('');
    };
    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                {/* <Dialog open={refId} onClose={handleClose} aria-labelledby="form-dialog-title" > */}
                <DialogTitle id="form-dialog-title">New User</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Name"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBoxOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>

                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBoxOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div>
                        </div>

                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div>

                        </div>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Age"
                            name="age"
                            value={age}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DateRangeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Address"
                            name="address"
                            value={address}
                            type="text"
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {
                        idUser ?
                            <Button onClick={handleConfirm} color="primary">
                                Accept
                            </Button>
                            :
                            <Button onClick={addUser} color="primary">
                                Create
                            </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormUser

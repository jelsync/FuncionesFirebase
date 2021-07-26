import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Delete = ({ openDelete, setOpenDelete, setIdUser, idUser, setRecarga }) => {

    const handleConfirm = async () => {
        setRecarga(false);
        const resp = await fetch(`http://localhost:5000/api-appland-22cd0/us-central1/app/api/user/${idUser}`, {
            method: 'DELETE'
        });
        // const body = await resp.json();
        setOpenDelete(false);
        setIdUser('');
    };

    const handleClose = () => {
        setOpenDelete(false);
        setIdUser('');
    };

    return (
        <div>
            <Dialog
                open={openDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation window"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Delete
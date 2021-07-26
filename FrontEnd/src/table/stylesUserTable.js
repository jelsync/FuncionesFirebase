import { withStyles, makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
    padding: 8,
    // textAlign: 'cernter',
    // paddingBottom: ,
    paddingLeft: 15,
    // paddingRight: 40
  },
  body: {
    fontSize: 14,
    paddingTop: 1,
    // paddingRight: 40,
    paddingRight: 30,
    paddingBottom: 1
  },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginTop: 50,
  },
  root: {
  },
  create: {
    marginTop: 5,
    position: 'absolute',
    right: 65

  },
});

export {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useStyles,
  StyledTableRow,
  StyledTableCell,
  IconButton,
  DeleteIcon,
  EditIcon,
  Button
}
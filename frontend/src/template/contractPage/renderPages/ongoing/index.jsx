import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Styled from './styled';
import { useQuery } from 'react-query';
import { apiInstance } from '@/libs/axios';

//
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
//

function createData(id, name, date, users) {
  return { id, name, date, users };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'name' },
  { id: 'date', numeric: true, disablePadding: false, label: 'date' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Ongoing = () => {
  const router = useRouter();
  const classes = Styled.useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const api = apiInstance();
  let userInfo = '';
  if (typeof window !== 'undefined' && window.sessionStorage) {
    userInfo = sessionStorage.getItem('chainTractLoginInfo');
  }
  //
  // const { isLoading, error, data } = useQuery('repoData', () =>
  //   api.get('/contracts/ongoing', { email: userInfo }).then((res) => res.json()),
  // );

  // if (isLoading) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;
  //

  const rows = [
    createData(2022040200000001, '계약서 title', '2022.04.02', [1, 4, 56, 23]),
    createData(2022040200000002, '계약서 title', '2022.04.02', [65, 34, 56, 23, 123]),
    createData(2022040200000003, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000004, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000005, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000006, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000007, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000008, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000009, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040200000010, '계약서 title', '2022.04.02', [39, 42, 56]),
    createData(2022040300000001, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000002, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000003, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000004, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000005, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000006, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000007, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000008, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000009, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040300000010, '계약서 title', '2022.04.03', [39, 42, 56]),
    createData(2022040400000001, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000002, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000003, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000004, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000005, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000006, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000007, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000008, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000009, '계약서 title', '2022.04.04', [39, 42, 56]),
    createData(2022040400000010, '계약서 title', '2022.04.04', [39, 42, 56]),
  ];

  //

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    router.push(`/contractdetail/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box>
          <Grid container spacing={0}>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Grid
                    item xs={3}
                    key={row.id}
                    hover="true"
                    onClick={(event) => handleClick(event, row.id)}
                    tabIndex={-1}
                    className={classes.tableRow}
                    p={3}
                  >
                    <Item>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          <br />{row.id}<br />
                        </Typography>
                        <Typography variant="h5" component="div">
                          {bull} {row.name} {bull}
                        </Typography>
                        <Typography variant="body2">
                          <br />작성일<br />{row.date}<br />
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          <br />(서명 진행 중)<br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">button</Button>
                      </CardActions>
                    </Item>
                  </Grid>
                );
              })
            }
          </Grid>
        </Box>
        <br /><br />
        <TablePagination
          rowsPerPageOptions={[8, 12, 16, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <br /><br />
      </Paper>
      {/* <div>데이터! : {data}</div> */}
    </div>
  );
};

export default Ongoing;

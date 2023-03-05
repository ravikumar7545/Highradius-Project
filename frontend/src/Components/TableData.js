import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import {useState,useEffect} from 'react';



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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'sl_no',
    disablePadding: true,
    label: 'Sl No.',
  },
  {
    id: 'business_code',
    numeric: true,
    disablePadding: false,
    label: 'Business Code',
  },
  {
    id: 'cust_number',
    numeric: true,
    disablePadding: true,
    label: 'Customer Number',
  },
  {
    id: 'clear_date',
    numeric: true,
    disablePadding: false,
    label: 'Clear Date',
  },
  {
    id: 'buisness_year',
    numeric: true,
    disablePadding: false,
    label: 'Business Year',
  },
  {
    id: 'doc_id',
    numeric: false,
    disablePadding: true,
    label: 'Document Id',
  },
  {
    id: 'posting_date',
    numeric: true,
    disablePadding: false,
    label: 'Posting Date',
  },
  {
    id: 'document_create_date',
    numeric: true,
    disablePadding: false,
    label: 'Document Create Date',
  },
  {
    id: 'due_in_date',
    numeric: true,
    disablePadding: false,
    label: 'Due in Date',
  },
  {
    id: 'invoice_currency',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Currency',
  },
  {
    id: 'document_type',
    numeric: false,
    disablePadding: true,
    label: 'Document Type',
  },
  {
    id: 'posting_id',
    numeric: true,
    disablePadding: false,
    label: 'Posting Id',
  },
  {
    id: 'total_open_amount',
    numeric: true,
    disablePadding: false,
    label: 'Total Open Amount',
  },
  {
    id: 'baseline_create_date',
    numeric: true,
    disablePadding: false,
    label: 'Baseline Create Date',
  },
  {
    id: 'cust_payment_terms',
    numeric: true,
    disablePadding: false,
    label: 'Customer Payment Terms',
  },
  {
    id:"invoice_id",
    numeric:true,
    disablePadding:true,
    label:"Invoice Id"
  },
  {
    id:"area_business",
    numeric:true,
    disablePadding:true,
    label:"Aging Bucket"
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{zIndex:1}} >
      <TableRow sx={{"& th,& td": {
                color: "white"
              }}}>
        <TableCell padding="checkbox">
          <Checkbox
          style={{color:"white"}}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
          component="th"
            key={headCell.id}
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
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setrow] = useState([]);
  const [editRow,setEditRow] = useState([]);

  
  


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    fetch("http://localhost:8080/Highradius_training/GetData").then((res)=>res.json().then((data)=>{
        setrow(data.invoice_details);
        props.closeRefreshTrigger();
    }))
  }, [props.refreshTrigger])

  useEffect(() => {

    setrow(props.advanceSearchData);
    
    
  }, [props.advanceSearchData.length])
  

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sl_no);
      setSelected(newSelecteds);
      props.getDeleteRow(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    props.getDeleteRow(name);
    props.getEditRow(name);
    props.setPredictSl(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow:"hidden" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ minHeight:350, maxHeight:360,backgroundColor:"#395570" }}>
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              
            />
            <TableBody sx={{backgroundColor:"#395570"}}>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((val)=>{
                  if(props.customerId===""){
                    return val;
                  }
                  else if(val.cust_number.toLowerCase().includes(props.customerId.toLowerCase())){
                    return val;
                  }
                }).filter((val)=>{
                  if(props.predictedData[0]){
                      if(val.doc_id.includes(props.predictedData[0].doc_id)){
                        val.area_business = props.predictedData[0].aging_bucket;
                        return val;
                        
                      }
                      else{
                        return val;
                      }
                     
                    }
                  else{
                    return val;
                  }
                })
                .map((row_data, index) => {
                  const isItemSelected = isSelected(row_data.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row_data.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row_data.sl_no}
                      selected={isItemSelected}
                      
                      sx={{"& td": {
                        color: "white"
                      }}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          style={{color:"white"}}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell id={row_data.sl_no} scope="row" padding="none">{row_data.sl_no}</TableCell>
                      
                      <TableCell >{row_data.business_code}</TableCell>
                      <TableCell padding="none">{row_data.cust_number}</TableCell>
                      <TableCell  >{row_data.clear_date}</TableCell>
                      <TableCell>{row_data.buisness_year}</TableCell>
                      <TableCell>{row_data.doc_id}</TableCell>
                      <TableCell>{row_data.posting_date}</TableCell>
                      <TableCell>{row_data.document_create_date}</TableCell>
                      <TableCell>{row_data.due_in_date}</TableCell>
                      <TableCell>{row_data.invoice_currency}</TableCell>
                      <TableCell align="center">{row_data.document_type}</TableCell>
                      <TableCell>{row_data.posting_id}</TableCell>
                      <TableCell>{row_data.total_open_amount}</TableCell>
                      <TableCell>{row_data.baseline_create_date}</TableCell>
                      <TableCell>{row_data.cust_payment_terms}</TableCell>
                      <TableCell>{row_data.invoice_id}</TableCell>
                      <TableCell>{row_data.area_business}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination style={{backgroundColor:"#34495e",color:"white"}}
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Box>
     
   
  );
}

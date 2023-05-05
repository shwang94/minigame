import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import {
    Box, Paper, Grid, Typography, Container, Table, TableBody, TableHead, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, IconButton
} from '@mui/material';

import PropTypes from 'prop-types';
import { imagesPrize } from '../data';
import { designColor } from '../design';
const apiUrl = process.env.REACT_APP_API_URL;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <Icon icon="ph:arrow-line-right-duotone" color={designColor.greenlight.color} width="20" height="20" />
                    : <Icon icon="ph:arrow-line-left-duotone" color={designColor.greenlight.color} width="20" height="20" />
                }
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <Icon icon="solar:square-alt-arrow-right-line-duotone" color={designColor.greenlight.color} width="20" height="20" />
                    : <Icon icon="solar:square-alt-arrow-left-line-duotone" color={designColor.greenlight.color} width="20" height="20" />
                }
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <Icon icon="solar:square-alt-arrow-left-line-duotone" color={designColor.greenlight.color} width="20" height="20" />
                    : <Icon icon="solar:square-alt-arrow-right-line-duotone" color= {designColor.greenlight.color} width="20" height="20" />
                }
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <Icon icon="ph:arrow-line-left-duotone" color={designColor.greenlight.color} width="20" height="20" />
                    : <Icon icon="ph:arrow-line-right-duotone" color={designColor.greenlight.color} width="20" height="20" />
                }
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(code, discount) {
    return { code, discount };
}

async function voucherList(voucherList) {
    const results = await Promise.all(voucherList.map(async (code) => {
        try {
            const response = await axios.get(`${apiUrl}/discount/${code}`);
            return createData(code, response.data + "%");
        } catch (error) {
            console.error(error);
            return null;
        }
    }));
    return results;
}

export default function Histories() {
    const { user } = useSelector((reduxData) => reduxData.userReducers);
    const [prize, setPrize] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = voucher

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {

        axios.get(`${apiUrl}/gamedice/dice-history/${user.username}`,

            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(function (response) {

                setTimeout(() => {
                    setDataUser(response.data.dices)
                }, 500);


            })
            .catch(function (error) {

                if (error.response.status === 401) {
                    console.log(error);


                }
            });

        axios.get(`${apiUrl}/gamedice/prize-history/${user.username}`,

            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(function (response) {
                setPrize(response.data.prizes);
                console.log("prize", response.data.prizes);

            })
            .catch(function (error) {
                console.log(error);

            });

        axios.get(`${apiUrl}/gamedice/voucher-history/${user.username}`,

            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(function (response) {

                voucherList(response.data.vouchers)
                    .then((result) => {
                        // console.log("list", result);
                        setVoucher(result);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            })
            .catch(function (error) {
                console.log(error);

            });
    }, [user]);

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <div>
                        {user ?
                            <>
                                <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color, fontSize: "20px" }}>username: <b style={{ color: "violet", }}>{user.username}</b></Item>
                                <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color}}>Số lần ném: <b style={{ color: designColor.greenlight.color, }}>{dataUser.length}</b></Item>
                                <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color}}>Tổng số voucher: <b style={{ color: designColor.greenlight.color, }}>{voucher.length}</b></Item>
                                <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color}}>Tổng số quà: <b style={{ color: designColor.greenlight.color, }}>{prize.length}</b></Item>
                                <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color}}>Điểm cao nhất đạt được là: <b style={{ color: designColor.greenlight.color, }}>{dataUser.length > 0 ? Math.max(...dataUser) : 0}</b></Item>
                                <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color}}>Tổng điểm: <b style={{ color: "red", fontSize: "20px" }}>{dataUser.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</b></Item>
                            </>
                            :
                            <Item style={{ backgroundColor: designColor.black.color, color:designColor.graylight.color}}>người dùng chưa đăng nhập </Item>
                        }
                    </div>
                </Grid>
                <Grid item xs={24} sm={8}>
                    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(15%, 1fr))",
      gridGap: "10px",
      justifyContent: "space-around"
  }}>
                        {prize ?
                            <>

                                {imagesPrize.slice(2).map((items) => {
                                    return (
                                        <Item style={{ flexBasis: "15%", backgroundColor: designColor.black.color, color:designColor.greenlight.color}}>
                                            <img alt="img" style={{ width: "100%", height: "130px", verticalAlign: "middle" }}
                                                src={items.link} />
                                            <Typography><b style={{ color: "red", }}>{prize.filter(item => item === items.name).length}</b></Typography>
                                            <Typography style={{fontSize:'10px'}}>{items.description.replace("Bạn đã trúng thưởng phần quà là ", "").toUpperCase()}</Typography>
                                        </Item>
                                    )
                                })}
                            </>
                            :
                            <Item style={{backgroundColor: designColor.black.color, color:designColor.greenlight.color}}>Người dùng chưa đăng nhập </Item>
                        }
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{marginTop:"50px"}}>
                
                <TableContainer component={Paper} style={{ backgroundColor: designColor.black.color}}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{color:designColor.graylight.color}}>Mã Voucher</TableCell>
                            <TableCell align="left" style={{color:designColor.graylight.color}}>Discount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" style={{color:designColor.greenlight.color}}>
                                    {row.code}
                                </TableCell>
                                <TableCell style={{ color:designColor.greenlight.color}} align="left" >
                                    {row.discount}
                                </TableCell>

                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ color:designColor.greenlight.color, height: 53 * emptyRows }}>
                                <TableCell colSpan={6} style={{ color:designColor.greenlight.color}}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                    style: { backgroundColor:designColor.graylight.color, color:designColor.black.color}
                                }}
                                style={{ color:designColor.graylight.color}}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            </Grid>
           
        </Container>
    )
}

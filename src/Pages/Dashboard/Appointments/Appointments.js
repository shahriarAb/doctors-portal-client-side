import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import useAuth from './../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const Appointments = ({ date }) => {
    const { user, token } = useAuth()
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const url = `https://powerful-mountain-98726.herokuapp.com/appointments?email=${user.email}&date=${date.toLocaleDateString()}`;
        fetch(url, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAppointments(data));
    }, [date, user.email, token]);

    return (
        <Box>
            <Typography sx={{ fontWeight: 600 }} variant="h5" color="info.main">
                Appointments
            </Typography>
            <Typography variant="p">
                Total Appointments: {appointments.length}
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="right">Treatment</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.patientName}
                                </TableCell>
                                <TableCell align="right">{row.serviceName}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.payment ?
                                    <Typography sx={{ backgroundColor: 'lightgreen', py: 0.5, pr: 3, borderRadius: 1 }}>Paid</Typography>
                                    :
                                    <Link to={`/dashboard/payment/${row._id}`} style={{ textDecoration: 'none' }}>
                                        <Button sx={{ py: 0.5 }} variant="contained" color="error">Pay</Button></Link>
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Appointments;
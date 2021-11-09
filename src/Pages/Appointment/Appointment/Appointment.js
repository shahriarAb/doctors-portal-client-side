import { Typography } from '@mui/material';
import React from 'react';
import Navigation from '../../../Shared/Navigation/Navigation';
import AppointmentHeader from '../AppointmentHeader/AppointmentHeader';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const Appointment = () => {
    const [date, setDate] = React.useState(new Date());
    return (
        <div>
            <Navigation></Navigation>
            <Typography sx={{ color: 'info.main', my: 5, fontWeight: 600 }} variant="h4" component="h2">
                Book an Appoinment
            </Typography>
            <AppointmentHeader date={date} setDate={setDate}></AppointmentHeader>
            <AvailableAppointments date={date}></AvailableAppointments>
        </div>
    );
};

export default Appointment;
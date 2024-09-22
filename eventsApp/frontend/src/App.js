import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import MFA from './components/MFA';
import Notifications from './components/Notifications';
import BiometricAuth from './components/BiometricAuth';
import VenueSearch from './components/VenueSearch';
import VenueProfile from './components/VenueProfile';
import VenueAvailability from './components/VenueAvailability';
import VenueBookings from './components/VenueBookings';
import VendorSearch from './components/VendorSearch';
import VendorProfile from './components/VendorProfile';
import VendorAvailability from './components/VendorAvailability';
import VendorBookings from './components/VendorBookings';
import Budgeting from './components/Budgeting';
import Tasks from './components/Tasks';
import GuestList from './components/GuestList';
import Payments from './components/Payments';
import Invoices from './components/Invoices';

const App = () => {
  return (
    <div className="App">
      <Register />
      <Login />
      <Profile />
      <MFA />
      <Notifications />
      <BiometricAuth />
      <VenueSearch />
      <VenueProfile />
      <VenueAvailability />
      <VenueBookings />
      <VendorSearch />
      <VendorProfile />
      <VendorAvailability />
      <VendorBookings />
      <Budgeting />
      <Tasks />
      <GuestList />
      <Payments />
      <Invoices />
    </div>
  );
}

export default App;

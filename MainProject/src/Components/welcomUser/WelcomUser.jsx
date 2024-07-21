import { useState, useEffect } from "react";
import moment from 'moment';
import PropTypes from 'prop-types';

export default function WelcomUser(props) {
  const [date, setDate] = useState(moment().format('dddd Do MMMM YYYY'));
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
      const now = moment();
      setDate(now.format('dddd Do MMMM YYYY'));
      const hour = now.hour();
      if (hour < 12) {
        setGreeting('Good Morning');
      } else if (hour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
    }
  },[]);


  return (
    //<h1 className='mx-4 mt-2 text-3xl italic font-bold text-primary'>Good Morning, {"raed"}</h1>
    <div className="mx-4 pt-1 mb-0">
      <h1 className=" inline-block mr-2 text-3xl italic font-bold text-primary">{greeting+", "} <span className="text-logoColor">{props.name }</span></h1>
      <p className=" inline-block text-sm italic">{date}</p>
    </div>
  )
}

WelcomUser.propTypes = {
  name: PropTypes.string.isRequired,
};
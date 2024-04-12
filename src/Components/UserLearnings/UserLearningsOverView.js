import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useState } from 'react';
import { Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{color:'white'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({data}) {
  const [value, setValue] = React.useState(0);
  const[lesson,setdata] = useState({title:'',description:'',content:''});

  const history = useHistory();
 
useEffect(()=>{

    if (data) {
        setdata({ ...lesson, title: data.title ,
            description:data.description,content:data.content});
      }

},[data])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ color:'white', width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{color:'white'}} label="Overview" {...a11yProps(0)} />
          <Tab sx={{color:'white'}} label="Content" {...a11yProps(1)} />
          <Tab sx={{color:'white'}} label="Notes" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack spacing={2}>
        <Typography variant='h5'>{lesson.title}</Typography>
        <Typography variant='h6'sx={{fontFamily: "serif"}}>{lesson.description}</Typography>
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Typography variant='h5'> What you'll learn</Typography>
        <Typography variant='h6'sx={{fontFamily: "serif"}}>{lesson.content}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Notes
      </CustomTabPanel>
    </Box>
  );
}

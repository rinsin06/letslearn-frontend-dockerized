import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, Paper, Typography } from '@mui/material'; // Fixed import
import { PieChart } from '@mui/x-charts/PieChart';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EnhancedTableTable from '../UserList/UserList';

export default function Dashboard() {
  const defaultTheme = createTheme();

  

  return (
    <ThemeProvider theme={defaultTheme}>
      
        <CssBaseline />
        <Container>
        <Grid   container>
          <Grid sx={{alignContent:'center'}} direction={'row'}  item xs={6}>
            
              <BarChart
                series={[
                  { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
                  { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
                  { data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
                  { data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
                  { data: [10, 6, 5, 8, 9], label: 'Series C1' },
                ]}
                width={600}
                height={350}
              />
            
          </Grid>
         
      <Grid item xs={2}>
      
      </Grid>

        </Grid>
        </Container>
        
      
    </ThemeProvider>
  );
}

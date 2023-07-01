import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './ApplyFilterButton.css'

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row" className='ApplyFilterButton'>
      <Button variant="contained">Apply Filter</Button>
    </Stack>
  );
};

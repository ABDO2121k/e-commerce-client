import { Grid } from '@mui/material'
import React from 'react'
import UsersTable from '../components/tables/UsersTable'

const Chats = () => {
  return (
    <div>
    <Grid container>
      <Grid item xs={12}>
        <UsersTable/>
      </Grid>
    </Grid>
  </div>
  )
}

export default Chats
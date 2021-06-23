import React from 'react';
import Head from 'next/head';
import { Grid, Typography } from '@material-ui/core';

export default function Index() {
  return (
    <div>
      <Head>
        <title>The Den</title>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography>The Den</Typography>
        <Grid item xs>
          
        </Grid>
      </Grid>
    </div>
  );
}

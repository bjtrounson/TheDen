import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Nav from '../components/Nav'
import Head from 'next/head';

export default function Index() {
  return (
    <div>
      <Head>
        <title>The Den</title>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Nav/>
      <Container color='primary'>
        <Box my={4} color='inherit'>
          
        </Box>
      </Container>
    </div>
  );
}

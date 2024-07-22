import React from 'react'
import notFound from '../../assets/images/error.svg'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';

export default function NotFound() {
  const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;
const NotFount = styled.img`
display: block;
`
  return (
    <Container >
          <Helmet>
        <meta charSet="utf-8" />
        <title>404: This Page Not Found</title>
      </Helmet>
      <NotFount className='d-block' src={notFound} alt="" />
     
    </Container>
  )
}

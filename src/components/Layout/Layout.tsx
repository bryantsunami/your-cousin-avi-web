import React from 'react';

import Header from '../Header';
import Body from '../Body';
import Button from '../Button';

import './Layout.css';

const asyncAction = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Async is done!');
      resolve();
    }, 50);
  });
  return promise;
};
const Layout = () => {
  return (
    <>
      <Header />
      <Body />
      <Button clickAction={asyncAction}>Button has a lot of text</Button>
    </>
  );
};

export default Layout;

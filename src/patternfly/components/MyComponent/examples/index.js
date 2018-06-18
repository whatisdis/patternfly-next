import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import docs from '../docs/code.md';
import MycomponentExample1 from './my-component-example1.hbs';
import MycomponentExample2 from './my-component-example2.hbs';
import '../styles.scss';

export const Docs = docs;

export default () => {
  const myComponentExample1 = MycomponentExample1();
  const myComponentExample2 = MycomponentExample2();

  return (
    <Documentation docs={Docs}>
      <Example heading="Mycomponent Example 1">{myComponentExample1}</Example>
      <Example heading="Mycomponent Example 2">{myComponentExample2}</Example>
    </Documentation>
  );
};

import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import docs from '../docs/code.md';
import Mycomponent2Example1 from './my-component2-example1.hbs';
import Mycomponent2Example2 from './my-component2-example2.hbs';
import '../styles.scss';

export const Docs = docs;

export default () => {
  const myComponent2Example1 = Mycomponent2Example1();
  const myComponent2Example2 = Mycomponent2Example2();

  return (
    <Documentation docs={Docs}>
      <Example heading="Mycomponent2 Example 1">{myComponent2Example1}</Example>
      <Example heading="Mycomponent2 Example 2">{myComponent2Example2}</Example>
    </Documentation>
  );
};

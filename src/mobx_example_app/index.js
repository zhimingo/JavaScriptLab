import React, { Component } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

const MobxExampleApp = () => {
  const person = useLocalStore(() => ({ name: 'John' }));
  return useObserver(() => {
    <div>{person.name}</div>;
  });
};

export default MobxExampleApp;

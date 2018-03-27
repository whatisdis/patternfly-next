import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import Toolbar, { ToolbarGroup, Docs } from '@layouts/Toolbar';

export default () => {
  return (
    <Documentation docs={Docs} className="is-layout-page">
      <Example heading="Toolbar Example">
        <Toolbar>
          <ToolbarGroup>
            <span>Content</span>
            <span>Content</span>
          </ToolbarGroup>
          <ToolbarGroup>
            <span>Content</span>
            <span>Content</span>
          </ToolbarGroup>
          <ToolbarGroup>
            <span>Content</span>
          </ToolbarGroup>
        </Toolbar>
      </Example>
    </Documentation>
  );
};

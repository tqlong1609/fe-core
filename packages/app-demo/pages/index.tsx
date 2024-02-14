'use client';
import { withLogError } from '@tqlong1609/functions';
import React from 'react';

const index: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          throw new Error('Test error');
        }}
      >
        click
      </button>
    </div>
  );
};

export default withLogError(index)((message) => {
  console.log('Log Error:', message);
});

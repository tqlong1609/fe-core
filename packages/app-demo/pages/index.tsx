'use client';
import { useIsMobile } from '@tqlong1609/hooks';
import { LazyLoadComponent } from 'packages/functions/src/lib/LazyLoadComponent';
import React from 'react';

const index: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <div
        style={{
          width: 100,
          height: 1500,
          background: 'blue',
        }}
      />
      <LazyLoadComponent>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'red',
          }}
        >
          component
        </div>
      </LazyLoadComponent>
    </div>
  );
};

export default index;

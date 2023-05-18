import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';



interface CustomScrollbarProps {
  children: React.ReactNode;
}

const CustomScrollbar = ({ children }: CustomScrollbarProps) => {
  return (
    <Scrollbars
      style={{ width: '100%', height: '100vh' }}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#888',
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;

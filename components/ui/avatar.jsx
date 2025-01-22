import React from 'react';
import { cn } from '../../lib/utils';

const Avatar = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600">
        {children}
      </div>
    </div>
  );
});

Avatar.displayName = 'Avatar';

export { Avatar };
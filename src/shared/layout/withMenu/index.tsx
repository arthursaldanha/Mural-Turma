import { ElementType, useState } from 'react';

import { Widget } from '@/shared/components/Feedback/Widget';
import { Header } from '@/shared/components/Header';
import { Sidebar } from '@/shared/components/Sidebar';

interface Options {
  hasSidebar?: boolean;
  hasHeader?: boolean;
}

export const withMenu = (WrappedComponent: ElementType, options?: Options) => {
  const Wrapper = (props: unknown) => {
    const [hasSidebar] = useState(options?.hasSidebar ?? true);
    const [hasHeader] = useState(options?.hasHeader ?? true);

    return (
      <div className="min-h-screen flex relative">
        {hasSidebar && <Sidebar />}
        <div className="min-h-screen flex flex-col flex-1">
          {hasHeader && <Header />}
          <WrappedComponent {...props} />
        </div>
        <Widget />
      </div>
    );
  };

  return Wrapper;
};

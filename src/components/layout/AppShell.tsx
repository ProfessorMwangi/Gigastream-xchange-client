import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main
        className={clsx(
          'transition-all duration-300',
          isCollapsed ? 'pl-20' : 'pl-72'
        )}
      >
        {children}
      </main>
    </div>
  );
}

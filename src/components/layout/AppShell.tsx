import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';

interface AppShellProps {
  children: ReactNode;
  userRole?: 'agent' | 'media_owner';
}

export function AppShell({ children, userRole = 'agent' }: AppShellProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
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

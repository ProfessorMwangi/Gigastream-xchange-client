import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../common';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconColor = 'bg-primary-100 text-primary-600' }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change !== undefined && (
          <div className={clsx(
            'flex items-center gap-1 mt-2 text-sm font-medium',
            isPositive && 'text-success-600',
            isNegative && 'text-error-500',
            !isPositive && !isNegative && 'text-gray-500'
          )}>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            <span>{isPositive ? '+' : ''}{change}% from last month</span>
          </div>
        )}
      </div>
      <div className={clsx('p-3 rounded-xl', iconColor)}>
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );
}

import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface Activity {
  id: string;
  type: 'confirmed' | 'pending' | 'declined' | 'created';
  message: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityConfig = {
  confirmed: {
    icon: CheckCircle,
    iconClass: 'text-success-500 bg-success-50',
  },
  pending: {
    icon: Clock,
    iconClass: 'text-warning-500 bg-warning-50',
  },
  declined: {
    icon: XCircle,
    iconClass: 'text-error-500 bg-error-50',
  },
  created: {
    icon: AlertCircle,
    iconClass: 'text-primary-500 bg-primary-100',
  },
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const config = activityConfig[activity.type];
        const Icon = config.icon;

        return (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={clsx('p-2 rounded-lg', config.iconClass)}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">{activity.message}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.timestamp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

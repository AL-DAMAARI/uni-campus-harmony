import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, User, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const { user } = useAuth();

  const getActivitiesForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { time: '2 mins ago', action: 'New student enrollment', user: 'Sarah Johnson', status: 'success', icon: User },
          { time: '15 mins ago', action: 'Course schedule updated', user: 'Dr. Mike Chen', status: 'info', icon: BookOpen },
          { time: '1 hour ago', action: 'Payment received', user: 'Alex Rodriguez', status: 'success', icon: CheckCircle },
          { time: '2 hours ago', action: 'Faculty leave request', user: 'Prof. Lisa Wang', status: 'warning', icon: AlertCircle },
          { time: '3 hours ago', action: 'Exam results published', user: 'Dr. John Smith', status: 'success', icon: CheckCircle },
        ];
      case 'faculty':
        return [
          { time: '30 mins ago', action: 'Assignment submitted', user: 'Emily Davis', status: 'info', icon: BookOpen },
          { time: '1 hour ago', action: 'Grade entered for Quiz 3', user: 'CS101 Students', status: 'success', icon: CheckCircle },
          { time: '2 hours ago', action: 'Student query received', user: 'Mark Thompson', status: 'warning', icon: AlertCircle },
          { time: '4 hours ago', action: 'Attendance marked', user: 'CS201 Class', status: 'success', icon: CheckCircle },
          { time: '5 hours ago', action: 'Course material uploaded', user: 'Database Systems', status: 'info', icon: BookOpen },
        ];
      case 'student':
        return [
          { time: '1 hour ago', action: 'Assignment due reminder', user: 'Data Structures', status: 'warning', icon: AlertCircle },
          { time: '2 hours ago', action: 'Grade posted', user: 'Calculus II - Quiz 2', status: 'success', icon: CheckCircle },
          { time: '1 day ago', action: 'Course material available', user: 'Physics Lab', status: 'info', icon: BookOpen },
          { time: '2 days ago', action: 'Fee payment confirmed', user: 'Semester Fee', status: 'success', icon: CheckCircle },
          { time: '3 days ago', action: 'Schedule updated', user: 'Linear Algebra', status: 'info', icon: BookOpen },
        ];
      case 'department_head':
        return [
          { time: '1 hour ago', action: 'Course approval request', user: 'Dr. Anderson', status: 'warning', icon: AlertCircle },
          { time: '3 hours ago', action: 'Budget allocation updated', user: 'CS Department', status: 'success', icon: CheckCircle },
          { time: '1 day ago', action: 'Faculty meeting scheduled', user: 'All Faculty', status: 'info', icon: BookOpen },
          { time: '2 days ago', action: 'Curriculum review completed', user: 'Academic Board', status: 'success', icon: CheckCircle },
          { time: '3 days ago', action: 'New faculty interview', user: 'Dr. Sarah Kim', status: 'info', icon: User },
        ];
      default:
        return [];
    }
  };

  const activities = getActivitiesForRole();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-university-navy/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-university-navy" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
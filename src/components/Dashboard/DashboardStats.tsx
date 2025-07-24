import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardStats: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Students', value: '2,847', icon: Users, color: 'text-university-navy', change: '+12%' },
          { title: 'Faculty Members', value: '284', icon: Users, color: 'text-university-green', change: '+3%' },
          { title: 'Active Courses', value: '156', icon: BookOpen, color: 'text-university-gold', change: '+8%' },
          { title: 'Revenue (Monthly)', value: '$847,392', icon: DollarSign, color: 'text-green-600', change: '+15%' },
        ];
      case 'faculty':
        return [
          { title: 'My Courses', value: '6', icon: BookOpen, color: 'text-university-navy', change: '+1' },
          { title: 'Total Students', value: '248', icon: Users, color: 'text-university-green', change: '+12' },
          { title: 'Pending Grades', value: '24', icon: GraduationCap, color: 'text-university-gold', change: '-8' },
          { title: 'Classes This Week', value: '18', icon: Calendar, color: 'text-blue-600', change: '0' },
        ];
      case 'student':
        return [
          { title: 'Enrolled Courses', value: '6', icon: BookOpen, color: 'text-university-navy', change: '+1' },
          { title: 'Current GPA', value: '3.78', icon: GraduationCap, color: 'text-university-green', change: '+0.12' },
          { title: 'Attendance', value: '94%', icon: Calendar, color: 'text-university-gold', change: '+2%' },
          { title: 'Credits Completed', value: '84/120', icon: TrendingUp, color: 'text-blue-600', change: '+6' },
        ];
      case 'department_head':
        return [
          { title: 'Department Students', value: '485', icon: Users, color: 'text-university-navy', change: '+18' },
          { title: 'Faculty Members', value: '28', icon: Users, color: 'text-university-green', change: '+2' },
          { title: 'Department Courses', value: '42', icon: BookOpen, color: 'text-university-gold', change: '+3' },
          { title: 'Graduation Rate', value: '92%', icon: GraduationCap, color: 'text-green-600', change: '+4%' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-university-navy to-university-green opacity-20" />
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
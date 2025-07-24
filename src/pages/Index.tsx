import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardStats from '@/components/Dashboard/DashboardStats';
import RecentActivity from '@/components/Dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    if (hour >= 17) greeting = 'Good evening';
    
    return `${greeting}, ${user?.name}!`;
  };

  const getQuickActions = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Manage Students', icon: Users, action: () => {} },
          { label: 'Course Schedule', icon: Calendar, action: () => {} },
          { label: 'Financial Reports', icon: TrendingUp, action: () => {} },
          { label: 'System Settings', icon: BookOpen, action: () => {} },
        ];
      case 'faculty':
        return [
          { label: 'My Classes', icon: BookOpen, action: () => {} },
          { label: 'Grade Students', icon: Users, action: () => {} },
          { label: 'Upload Materials', icon: BookOpen, action: () => {} },
          { label: 'View Schedule', icon: Calendar, action: () => {} },
        ];
      case 'student':
        return [
          { label: 'My Courses', icon: BookOpen, action: () => {} },
          { label: 'View Grades', icon: TrendingUp, action: () => {} },
          { label: 'Course Schedule', icon: Calendar, action: () => {} },
          { label: 'Library', icon: BookOpen, action: () => {} },
        ];
      case 'department_head':
        return [
          { label: 'Dept. Overview', icon: TrendingUp, action: () => {} },
          { label: 'Faculty Management', icon: Users, action: () => {} },
          { label: 'Course Planning', icon: BookOpen, action: () => {} },
          { label: 'Budget Review', icon: Calendar, action: () => {} },
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-university-navy to-university-green rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
            <p className="text-university-light-blue mt-2">
              {user?.role === 'admin' && 'Manage your university operations efficiently'}
              {user?.role === 'faculty' && 'Ready to inspire and educate your students'}
              {user?.role === 'student' && 'Continue your academic journey'}
              {user?.role === 'department_head' && 'Lead your department to excellence'}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:bg-university-navy/5"
                    onClick={action.action}
                  >
                    <Icon className="h-5 w-5 mr-3 text-university-navy" />
                    <span className="text-left">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Additional Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">Midterm Exams</p>
                  <p className="text-sm text-muted-foreground">Starting next week</p>
                </div>
                <span className="text-sm text-university-gold">Oct 15-19</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">Faculty Meeting</p>
                  <p className="text-sm text-muted-foreground">Monthly review</p>
                </div>
                <span className="text-sm text-university-gold">Oct 25</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Registration Opens</p>
                  <p className="text-sm text-muted-foreground">Spring 2025</p>
                </div>
                <span className="text-sm text-university-gold">Nov 1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance Highlights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Overall Satisfaction</span>
                  <span className="text-sm font-semibold">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-university-green h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Course Completion Rate</span>
                  <span className="text-sm font-semibold">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-university-navy h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">System Uptime</span>
                  <span className="text-sm font-semibold">99.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-university-gold h-2 rounded-full" style={{width: '99.7%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

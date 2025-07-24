import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  DollarSign, 
  Building2, 
  Car, 
  BookMarked, 
  FlaskConical,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Students', href: '/students', icon: Users, roles: ['admin', 'faculty', 'department_head'] },
    { name: 'Courses', href: '/courses', icon: BookOpen, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Schedule', href: '/schedule', icon: Calendar, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Exams & Grades', href: '/exams', icon: GraduationCap, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Attendance', href: '/attendance', icon: Calendar, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Faculty', href: '/faculty', icon: Users, roles: ['admin', 'department_head'] },
    { name: 'Finances', href: '/finances', icon: DollarSign, roles: ['admin', 'student'] },
    { name: 'Hostel', href: '/hostel', icon: Building2, roles: ['admin', 'student'] },
    { name: 'Transport', href: '/transport', icon: Car, roles: ['admin', 'student'] },
    { name: 'Library', href: '/library', icon: BookMarked, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Research', href: '/research', icon: FlaskConical, roles: ['admin', 'faculty', 'student', 'department_head'] },
    { name: 'Career Services', href: '/career', icon: Briefcase, roles: ['admin', 'student'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'faculty', 'student', 'department_head'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-university-navy">UniManage</h1>
              <p className="text-xs text-muted-foreground">Student Management System</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="shrink-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-university-navy text-white flex items-center justify-center text-sm font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href);
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive 
                  ? "bg-university-navy text-white shadow-sm" 
                  : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center px-3"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
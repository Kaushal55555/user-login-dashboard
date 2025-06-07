
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Settings, LogOut, Shield, HelpCircle } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ProfileForm from '@/components/ProfileForm';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to load profile data');
          } else {
            setProfile(data);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error('Failed to sign out');
      } else {
        toast.success('Signed out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  const firstName = profile?.first_name || 'User';
  const lastName = profile?.last_name || '';
  const email = profile?.email || user?.email || '';
  const joinDate = profile?.created_at || user?.created_at || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Enhanced Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-fade-in">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground ring-2 ring-primary/20 transition-all duration-300 hover:scale-110 hover:ring-4">
              <span className="text-sm font-bold">
                {firstName[0]}{lastName[0] || ''}
              </span>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Welcome back, {firstName}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Have a great day ahead ✨
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-accent/80"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {/* Enhanced Profile Card */}
          <Card className="md:col-span-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="h-6 w-6 mr-3 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Your account details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                    {firstName}
                  </p>
                </div>
                <div className="group">
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                    {lastName || 'Not provided'}
                  </p>
                </div>
              </div>
              
              <div className="group">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                  {email}
                </p>
              </div>
              
              <div className="group">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member Since
                </label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                  {new Date(joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Status Card */}
          <Card className="transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                Account Status
              </CardTitle>
              <CardDescription>
                Current account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200 animate-pulse">
                    ✓ Active
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Type</label>
                <p className="text-lg font-semibold">Standard User</p>
              </div>
              
              <div className="pt-4">
                {profile && (
                  <ProfileForm 
                    profile={profile} 
                    onProfileUpdate={handleProfileUpdate}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Quick Actions */}
          <Card className="md:col-span-2 lg:col-span-3 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription>
                Frequently used actions and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/10 hover:border-primary group"
                >
                  <User className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Update Profile</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-24 flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/10 hover:border-primary group"
                >
                  <Settings className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform duration-200 group-hover:rotate-90" />
                  <span className="text-sm font-medium">Settings</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-24 flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50 hover:border-blue-300 group"
                >
                  <HelpCircle className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Support</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-24 flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-red-50 hover:border-red-300 group" 
                  onClick={handleLogout}
                >
                  <LogOut className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Sign Out</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

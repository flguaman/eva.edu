"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { OrganizedDashboard } from '@/components/dashboard/representative/organized-dashboard';
import { representativeData } from '@/lib/representative-data';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { ThemeSelector } from '@/components/theme-selector';

const RepresentativeDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header con botón de logout */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EVA</span>
              </div>
              <span className="font-semibold">Plataforma EVA</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSelector />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
      </header>

      {/* Dashboard organizado */}
      <OrganizedDashboard />
    </div>
  );
};

export default RepresentativeDashboard;

import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react';

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <li><Link to="/" className="hover:underline">Home</Link></li>
      <li><Link to="/about" className="hover:underline">About</Link></li>
      <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      <li><Link to="/data" className="hover:underline">Data</Link></li>
      <li><Link to="/components" className="hover:underline">Components</Link></li>
      {isAuthenticated ? (
        <>
          <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
          <li><Button onClick={logout} variant="ghost">Logout</Button></li>
        </>
      ) : (
        <li><Link to="/login" className="hover:underline">Login</Link></li>
      )}
    </>
  );

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Logo</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4 items-center">
            <NavItems />
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-4">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
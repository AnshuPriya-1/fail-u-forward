"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Bell, User, Briefcase, LogOut, Settings, HelpCircle, Plus } from "lucide-react";
import {
  Users,
  UserCircle,
  LogIn,
  X,
  Network,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { motion } from "framer-motion";
import { MdLogin } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  // Hide the navbar on the landing page
  if (pathname === "/") {
    return null;
  }
  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 w-full">
      <div className="container mx-auto px-4 flex h-14 justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-white">Fail U Forward</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {loggedIn ? (
            <>
              {/* Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" title="Menu">
                    <Home className="h-[1.2rem] w-[1.2rem] stroke-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-900 text-white">
                  <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/feed">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                      <Home className="mr-2 h-4 w-4 stroke-white" />
                      <span>Feed</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/network">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                      <Briefcase className="mr-2 h-4 w-4 stroke-white" />
                      <span>Network</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/create-post">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                      <Plus className="mr-2 h-4 w-4 stroke-white" />
                      <span>Create Post</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" title="User">
                    <User className="h-[1.2rem] w-[1.2rem] stroke-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-900 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                      <User className="mr-2 h-4 w-4 stroke-white" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                      <Settings className="mr-2 h-4 w-4 stroke-white" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/help">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700">
                      <HelpCircle className="mr-2 h-4 w-4 stroke-white" />
                      <span>Help</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer hover:bg-zinc-700" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4 stroke-white" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" title="Login" className="text-white bg-gray-900 hover:bg-white hover:text-black">
                  <MdLogin className="mr-1" /> Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-white bg-gray-900 hover:bg-white hover:text-black">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {loggedIn ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </motion.button>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" className="text-white bg-gray-800 hover:bg-gray-700">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-white bg-gray-800 hover:bg-gray-700">Sign Up</Button>
              </Link>
            </>

          )}
        </div>
      </div>


      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}
      
      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 left-0 z-50 w-[80vw] max-w-xs h-screen bg-white text-black transform transition-transform duration-500 ease-in-out shadow-lg ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold tracking-wide">Fail U Forward</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-black hover:text-gray-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="text-sm font-semibold text-gray-500 uppercase px-6 pt-6">
          Discover
        </div>

        <ul className="flex flex-col gap-3 px-6 py-4 text-base font-medium">
          <li>
            <Link
              href="/feed"
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/network"
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={20} />
              Network
            </Link>
          </li>

          {loggedIn ? (
            <>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserCircle size={20} />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full py-2 px-3 rounded-md hover:bg-gray-100 transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="w-full block bg-black text-white text-center py-2 rounded-md font-semibold hover:bg-gray-800 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LogIn
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="w-full block bg-black text-white text-center py-2 rounded-md font-semibold hover:bg-gray-800 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

    </nav>
  );
}

// File: WelcomePage.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component to show a welcome page for logged out users

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RibbonIcon as Yarn, Users, BookOpen, Heart } from "lucide-react";
import LoginDialog from "@/components/navbar/LoginDialog";
import SignUpDialog from "@/components/navbar/SignUpDialog";
// page for logged out user (not able to access anything besides explore)
export default function WelcomePage() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to CloseKnit
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect, create, and share your passion for crochet and
                  knitting with a community that cares.
                </p>
              </div>
              <div className="flex space-x-4">
                <SignUpDialog /> {/* This will trigger the Sign Up dialog */}
                <LoginDialog />
                {/* This will trigger the Log In dialog */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose closeKnit?
            </h2>
            <div className="flex justify-center gap-6 ">
              <Card>
                <CardHeader>
                  <Users className="h-6 w-6 mb-2" />
                  <CardTitle>Connect with Crafters</CardTitle>
                </CardHeader>
                <CardContent>
                  Join a vibrant community of crochet and knitting enthusiasts.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BookOpen className="h-6 w-6 mb-2" />
                  <CardTitle>Share Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  Discover and share unique patterns with fellow crafters.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Yarn className="h-6 w-6 mb-2" />
                  <CardTitle>Track Your Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  Keep track of your yarn, hooks, needles, and other supplies.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Heart className="h-6 w-6 mb-2" />
                  <CardTitle>Get Inspired</CardTitle>
                </CardHeader>
                <CardContent>
                  Find inspiration from projects shared by the community.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

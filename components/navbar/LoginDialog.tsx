"use client";

// File: LoginDialog.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the Login dialog component (popup for logging in)

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

// a schema for the form (required values etc)
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginDialog() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); //track dialog state

  // setting default values for the form and creating an instance of the fomr
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // upon submission, use the form values to call the backend
  const login = async (data: LoginFormValues) => {
    try {
      // create formData to send
      const formData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const response = await apiService.post(
        "/api/auth/login/",
        JSON.stringify(formData)
      );

      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        toast({
          title: "Success!",
          description: "You have successfully logged in.",
        });
        // close the dialog and reload the page
        setIsLoginOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* open the dialog */}
      <Button
        onClick={() => {
          setIsLoginOpen(true);
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Log In
      </Button>
      {/* dialog UI component */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>
              Please enter your credentials.
            </DialogDescription>
          </DialogHeader>
          {/* form fields below */}
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(login)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

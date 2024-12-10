"use client";

// File: SignUpDialog.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the sign up dialog component (popup for signing up)

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
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import { toast } from "@/hooks/use-toast";

// a schema to define the form fields
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password1: z.string().min(8, "Password must be at least 8 characters"),
  password2: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpDialog() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  // set the default values for the form and create instance
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });
  // when form is submitted, create formdata containing the information and send to backend
  const handleSignup = async (data: SignupFormValues) => {
    try {
      const formData = {
        name: data.name,
        username: data.username,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      };

      const response = await apiService.post(
        "/api/auth/register/",
        JSON.stringify(formData)
      );
      // if the access token is present, lof the user in
      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        toast({
          title: "Success!",
          description: "You have successfully registered.",
        });
        // close the dialog and refresh the page
        setIsSignupOpen(false);
        window.location.reload();
      }
    } catch {
      toast({
        title: "Error",
      });
    }
  };

  return (
    <>
      {/* open the dialog */}
      <Button
        onClick={() => {
          setIsSignupOpen(true);
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Sign Up
      </Button>
      {/* dialog component */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Create a new account by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          {/* form fields */}
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(handleSignup)}
              className="space-y-4"
            >
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Create a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
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
                control={signupForm.control}
                name="password1"
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
              <FormField
                control={signupForm.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

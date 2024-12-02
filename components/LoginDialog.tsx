"use client"

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
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginDialog() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const login = async (data: LoginFormValues) => {
    try {
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

        setIsLoginOpen(false);
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={(e) => {
          setIsLoginOpen(true);
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Log In
      </Button>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>
              Please enter your credentials.
            </DialogDescription>
          </DialogHeader>
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

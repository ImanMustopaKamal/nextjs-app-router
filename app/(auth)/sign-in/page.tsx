"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { useRouter } from "next/router";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email("This is not a valid email."),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export default function SignInPage() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const routeParams = useSearchParams();
  const [error, setError] = useState({ status: false, message: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError({ status: false, message: "" });
    signIn("credentials", {
      ...values,
      redirect: true,
      callbackUrl: "/",
    });
  }

  useEffect(() => {
    const errorQuery = routeParams?.get("error");
    if (errorQuery) {
      setError({ status: true, message: errorQuery });
    }
  }, [routeParams?.get("error")]);

  useEffect(() => {
    if (error.status) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  }, [error.status]);

  return (
    <div>
      <Card className="sm:w-[450px] w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to access dashboard</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Please add you'r email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Please add you'r password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col justify-between w-full gap-3">
              <Button className="w-full" type="submit">
                Sign In
              </Button>
              <h3>or</h3>
              <Button variant="outline" className="w-full">
                Google
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

"use client";

import * as React from "react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Login extends React.HTMLAttributes<HTMLDivElement> {}

export default function Register({ className, ...props }: Login) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your informations below to create your account
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="firstName"
              placeholder="First Name"
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="lastName"
              placeholder="Last Name"
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="lastName"
              placeholder="E-Mail"
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>Register</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        Github
      </Button>
    </div>
  );
}

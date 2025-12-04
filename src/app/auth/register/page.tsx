"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";

const registerSchema = z
  .object({
    role: z.enum(["USER", "VENDOR"]),
    fullname: z.string().min(1, { message: "Full name is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    tradeLicence: z.instanceof(File).nullable().optional(),
    storeImage: z.instanceof(File).nullable().optional(),
    location: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "VENDOR") {
      if (!(data.tradeLicence instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tradeLicence"],
          message: "Trade licence image is required.",
        });
      }

      if (!(data.storeImage instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storeImage"],
          message: "Store image is required.",
        });
      }
    }
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tradeLicencePreview, setTradeLicencePreview] = useState<string | null>(null);
  const [storeImagePreview, setStoreImagePreview] = useState<string | null>(null);
  
  const togglePasswordVisibility = () =>
    setShowPassword((previous) => !previous);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "USER",
      fullname: "",
      email: "",
      phone: "",
      password: "",
      tradeLicence: null,
      storeImage: null,
      location: "",
    },
  });
  const role = useWatch({ control: form.control, name: "role" }) ?? "USER";

  const onSubmit = () => {
    // TODO: Implement registration API call
    // Example payload structure:
    // const basePayload = {
    //   name: data.fullname,
    //   email: data.email,
    //   phone: data.phone,
    //   password: data.password,
    //   confirmPassword: data.password,
    // };
    // const payload = data.role === "VENDOR"
    //   ? { ...basePayload, role: "VENDOR", tradeLicence: data.tradeLicence, storeImage: data.storeImage, location: data.location }
    //   : { ...basePayload, role: "USER" };
    // register(payload);
  };

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-secondary/10 to-background">
      <div className="pointer-events-none absolute bottom-24 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-1/3 h-80 w-80 translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl h-[95vh] sm:h-full justify-center p-4 sm:p-6 lg:p-8">
        <Card className="relative w-full">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
          <CardContent className="relative z-10 p-3 sm:p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="icon">
                  <ArrowLeft />
                </Button>
              </Link>
              <Link
                href="/support/faqs"
                className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground transition hover:text-primary"
              >
                Need help?
              </Link>
            </div>

            <div className="mt-3 space-y-1.5 text-center sm:mt-6 sm:space-y-3">
              <Badge className="bg-primary/10 px-4 py-1 font-semibold uppercase tracking-[0.35em] text-primary">
                Join Recycle Mart
              </Badge>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
                Create your account
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Choose buyer or vendor mode, then share the essentials so we can tailor your experience.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-3 sm:mt-8 sm:space-y-6"
              >
                <Tabs defaultValue="USER" className="w-full" onValueChange={(value) => form.setValue("role", value as "USER" | "VENDOR")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="USER">Buyer</TabsTrigger>
                    <TabsTrigger value="VENDOR">Vendor</TabsTrigger>
                  </TabsList>

                  <TabsContent value="USER" className="mt-3 sm:mt-6 space-y-6">
                    <div className="grid gap-6 sm:gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Full name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Rahman" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="student@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone number
                            </FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="01XXXXXXXXX" {...field} />
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
                            <FormLabel>
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a secure password"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-primary"
                                  onClick={togglePasswordVisibility}
                                  aria-label={
                                    showPassword ? "Hide password" : "Show password"
                                  }
                                >
                                  {showPassword ? (
                                    <EyeOff className="size-5" />
                                  ) : (
                                    <Eye className="size-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="VENDOR" className="mt-3 sm:mt-6 space-y-6">
                    <div className="grid gap-6 sm:gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Full name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Rahman" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="student@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone number
                            </FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="01XXXXXXXXX" {...field} />
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
                            <FormLabel>
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a secure password"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-primary"
                                  onClick={togglePasswordVisibility}
                                  aria-label={
                                    showPassword ? "Hide password" : "Show password"
                                  }
                                >
                                  {showPassword ? (
                                    <EyeOff className="size-5" />
                                  ) : (
                                    <Eye className="size-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tradeLicence"
                        render={({
                          field: { onChange, onBlur, name, ref },
                        }) => (
                          <FormItem>
                            <FormLabel>
                              Trade licence
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                {tradeLicencePreview ? (
                                  <div className="relative rounded-2xl border-2 border-border/60 bg-muted/10 p-2">
                                    <img
                                      src={tradeLicencePreview}
                                      alt="Trade licence preview"
                                      className="h-40 w-full rounded-xl object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setTradeLicencePreview(null);
                                        onChange(null);
                                      }}
                                      className="absolute right-3 top-3 rounded-full bg-destructive p-1.5 text-white transition-colors hover:bg-destructive/90"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="tradeLicence"
                                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/60 bg-muted/10 p-6 transition-colors hover:border-primary/40 hover:bg-muted/20"
                                  >
                                    <svg
                                      className="h-8 w-8 text-muted-foreground"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <div className="text-center">
                                      <p className="text-sm font-medium text-foreground">
                                        Upload trade licence
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        PNG, JPG up to 10MB
                                      </p>
                                    </div>
                                  </label>
                                )}
                                <Input
                                  id="tradeLicence"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(event) => {
                                    const file = event.target.files?.[0] ?? null;
                                    onChange(file);
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setTradeLicencePreview(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  onBlur={onBlur}
                                  name={name}
                                  ref={ref}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="storeImage"
                        render={({
                          field: { onChange, onBlur, name, ref },
                        }) => (
                          <FormItem>
                            <FormLabel>
                              Storefront image
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                {storeImagePreview ? (
                                  <div className="relative rounded-2xl border-2 border-border/60 bg-muted/10 p-2">
                                    <img
                                      src={storeImagePreview}
                                      alt="Store image preview"
                                      className="h-40 w-full rounded-xl object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setStoreImagePreview(null);
                                        onChange(null);
                                      }}
                                      className="absolute right-3 top-3 rounded-full bg-destructive p-1.5 text-white transition-colors hover:bg-destructive/90"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="storeImage"
                                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border/60 bg-muted/10 p-6 transition-colors hover:border-primary/40 hover:bg-muted/20"
                                  >
                                    <svg
                                      className="h-8 w-8 text-muted-foreground"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <div className="text-center">
                                      <p className="text-sm font-medium text-foreground">
                                        Upload store image
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        PNG, JPG up to 10MB
                                      </p>
                                    </div>
                                  </label>
                                )}
                                <Input
                                  id="storeImage"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={(event) => {
                                    const file = event.target.files?.[0] ?? null;
                                    onChange(file);
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setStoreImagePreview(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  onBlur={onBlur}
                                  name={name}
                                  ref={ref}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>
                              Store location (optional)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Area, city (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  type="submit"
                  className="w-full"
                >
                  {role === "VENDOR" ? "Create vendor account" : "Create buyer account"}
                </Button>
              </form>
            </Form>

            <p className="mt-6 text-center text-xs text-muted-foreground sm:mt-8 sm:text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

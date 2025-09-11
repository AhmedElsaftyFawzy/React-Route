"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateData, updatePassword } from "@/services/profile.services"
import { zodResolver } from "@hookform/resolvers/zod"
import { signOut } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export default function Page() {
  useEffect(() => {
    document.title = "Profile"
  }, [])
  const updateDataSchema = z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email format",
      }),

    phone: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, {
        message: "Invalid Egyptian phone number",
      }),
  })

  const updatePasswordSchema = z.object({
    currentPassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
    rePassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }
      ),
  })

  const form = useForm<z.infer<typeof updateDataSchema>>({
    resolver: zodResolver(updateDataSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
  const passwordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof updateDataSchema>) {
    const respond = await updateData(data)

    if (respond?.message == "success") {
      toast(<div className="text-main">Update User Data Successfully</div>, {
        position: "top-center",
      })
      signOut({ callbackUrl: "/login" })
    } else {
      toast(
        <div className="text-red-700 capitalize">{respond?.errors.msg}</div>,
        {
          position: "top-center",
        }
      )
    }
  }

  async function submitHandler(value: z.infer<typeof updatePasswordSchema>) {
    const respond = await updatePassword(value)
    if (respond?.message == "success") {
      toast(
        <div className="text-main">Update User Password Successfully</div>,
        {
          position: "top-center",
        }
      )
      signOut({
        callbackUrl: "/login",
      })
    } else {
      toast(
        <div className="text-red-700 capitalize">{respond?.errors.msg}</div>,
        {
          position: "top-center",
        }
      )
    }
  }
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mx-auto my-5">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name:</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
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
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
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
                        <FormLabel>Phone:</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-main cursor-pointer">
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(submitHandler)}
                  className="space-y-8"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password:</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password:</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="rePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RePassword:</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-main cursor-pointer">
                    Save Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

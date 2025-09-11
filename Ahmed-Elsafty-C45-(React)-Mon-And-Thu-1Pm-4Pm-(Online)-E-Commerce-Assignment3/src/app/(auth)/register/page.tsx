"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    document.title = "Register"
  }, [])
  const registerSchema = z
    .object({
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
        .nonempty({ message: "Please confirm your password" }),
      phone: z
        .string()
        .nonempty({ message: "Phone number is required" })
        .regex(/^01[0-2,5]{1}[0-9]{8}$/, {
          message: "Invalid Egyptian phone number",
        }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords don't match",
      path: ["rePassword"],
    })

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    )
    const resData = await res.json()
    if (resData.message == "success") {
      toast(<div className="text-main">Registion Is Successfull</div>, {
        position: "top-center",
      })

      router.push("/login")
    } else {
      toast(<div className="text-red-700 capitalize">{resData?.message}</div>, {
        position: "top-center",
      })
    }
  }
  return (
    <div className="w-8/12 mx-auto my-10 shadow-2xl p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

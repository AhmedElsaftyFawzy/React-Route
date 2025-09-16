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
import { reset } from "@/services/forget.services"

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    document.title = "Reset Password"
  }, [])
  const ResetSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email format",
      }),

    newPassword: z
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

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof ResetSchema>) {
    const respond = await reset(data)

    if (respond?.token) {
      toast(<div className="text-main">Reset Success</div>, {
        position: "top-center",
      })
      router.push("/login")
    } else {
      toast(<div className="text-red-700 capitalize">{respond?.message}</div>, {
        position: "top-center",
      })
    }
  }
  return (
    <div className="w-8/12 mx-auto my-10 shadow-2xl p-5 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="newPassword"
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
          <Button type="submit" className="bg-main cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

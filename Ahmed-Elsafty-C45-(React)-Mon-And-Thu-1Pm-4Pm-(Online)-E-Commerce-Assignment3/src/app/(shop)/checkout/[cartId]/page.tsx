"use client"
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
import { checkout } from "@/services/orders.services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export default function Page() {
  const router = useRouter()
  const params = useParams<{ cartId: string }>()
  const cartId = params.cartId

  useEffect(() => {
    document.title = "Checkout"
  }, [])
  const loginSchema = z.object({
    details: z.string().nonempty({ message: "details is required" }),
    phone: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, {
        message: "Invalid Egyptian phone number",
      }),

    city: z.string().nonempty({ message: "City is required" }),
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  })

  async function pay(
    data: z.infer<typeof loginSchema>,
    method: "Card" | "Cash"
  ) {
    const respond = await checkout(data, cartId, method)
    if (respond.status == "success") {
      toast(<div className="text-main">Checkout Success</div>, {
        position: "top-center",
      })
      if (method === "Card") {
        window.open(respond.session.url, "_self")
      } else {
        router.push("/")
        router.refresh()
      }
    } else {
      toast(
        <div className="text-red-700 capitalize">
          {respond?.message || "Error Had Happened"}
        </div>,
        {
          position: "top-center",
        }
      )
    }
  }

  return (
    <div className="w-8/12 mx-auto my-10 shadow-2xl p-5">
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="bg-main cursor-pointer me-5"
            onClick={form.handleSubmit((data) => {
              pay(data, "Card")
            })}
          >
            Pay With Card
          </Button>
          <Button
            type="button"
            className="bg-main cursor-pointer"
            onClick={form.handleSubmit((data) => {
              pay(data, "Cash")
            })}
          >
            Pay with Cash
          </Button>
        </form>
      </Form>
    </div>
  )
}

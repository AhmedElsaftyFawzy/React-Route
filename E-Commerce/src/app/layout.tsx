import "./globals.css"
import Navbar from "@/_Components/Navbar/Navbar"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Toaster } from "sonner"
import UserProvider from "@/_Components/UserProvider/UserProvider"
import CartProvider from "@/context/CartContext"
import Footer from "@/_Components/Footer/Footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <CartProvider>
            <Navbar></Navbar>
            <main> {children}</main>
            <Footer></Footer>
            <Toaster />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}

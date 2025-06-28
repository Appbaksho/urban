import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Checkbox } from "./ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [forgotEmail, setforgotEmail] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [pass, setpass] = useState<string>('')
  const [showPass, setshowPass] = useState<boolean>(false)
  const router = useRouter()
  const sendForgetEmail = ()=>{
    // send email to reset password
    sendPasswordResetEmail(auth, forgotEmail).then(()=>{
      setforgotEmail('')
      toast({
        title: 'Success',
        description: "Password reset email sent"
      })
    }).catch((e)=>{
      toast({
        title: 'Error',
        description: "Cannot send password reset email",
        variant:'destructive'
      })
    })
  }

  const loginUser = ()=>{
    // login user
    signInWithEmailAndPassword(auth, email, pass).then((user)=>{
      if(user){
        toast({
          title: 'Success',
          description: "Logged in successfully"
        })
        router.push('/dashboard')
      }
    }).catch((e)=>{
      toast({
        title: 'Error',
        description: "Cannot login user",
        variant:'destructive'
      })
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={e=>e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Dialog>
                    <DialogTrigger className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          <Label htmlFor="forgotEmail">Email</Label>
                          <Input
                            id="forgotEmail"
                            type="email"
                            placeholder="random@gmail.com"
                            required
                            value={forgotEmail}
                            onChange={(e) => setforgotEmail(e.target.value)}
                          />
                          <div className="flex items-center justify-end mt-2">
                            <Button size="sm" disabled={!forgotEmail} onClick={sendForgetEmail}>Send Email</Button>
                          </div>
                          
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  
                </div>
                <Input id="password" type={showPass?"text":"password"} required
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                 />
                <div className="flex items-center space-x-2 justify-end">
                  <Checkbox id="terms"
                  checked={showPass}
                  onCheckedChange={e=> setshowPass(p=>!p)}
                   />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Password
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={loginUser}>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

export const Auth = () => {
  const [selected, setSelected] = useState("login");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Tabs
          value={selected}
          onValueChange={setSelected}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <Card className="max-w-full h-[450px]">
            <CardHeader>
              <TabsContent value="login">
                <LoginForm setSelected={setSelected} />
              </TabsContent>
              <TabsContent value="sign-up">
                <RegisterForm setSelected={setSelected} />
              </TabsContent>
            </CardHeader>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

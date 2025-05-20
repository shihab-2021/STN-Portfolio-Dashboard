import LoginPage from "@/components/Login/LoginPage";
import React, { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <Suspense>
        <LoginPage />
      </Suspense>
    </div>
  );
}

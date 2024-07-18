import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, Role, useAuth } from "@/context/AuthContext";
const StackLayout =()=>{
  const {authState} = useAuth()
  const segments = useSegments()
  const router = useRouter()
  useEffect(()=>{
    const inAuthGroup = segments[0]==='(administrador)'
    if (inAuthGroup &&  !authState?.authenticated) {
      router.replace( '/')
      
    }else if (authState?.authenticated) {
      switch (authState.role) {
        case "Administrador":
          router.replace("/(administrador)")
          break;
        case "Colaborador":
          router.replace("/(colaborador)")
          break;
        case "Usuario":
          router.replace("/(usuario)")
          break;
      
        default:
          break;
      }
    }
  },[authState])
  return(
    <Stack>
    <Stack.Screen name="login"  options={{ headerShown: false }} />
    <Stack.Screen name="(administrador)" redirect={authState?.role !== Role.ADMIN} options={{ headerShown: false }} />
    <Stack.Screen name="(colaborador)" redirect={authState?.role !== Role.COLAB} options={{ headerShown: false }} />
    <Stack.Screen name="(usuario)" redirect={authState?.role !== Role.USER}  options={{ headerShown: false }} />
    </Stack>
  )
}

function RootLayout() {


  return (
    <AuthProvider>
      <StackLayout/>
    </AuthProvider>
  );
}

export default RootLayout;

import { useRouter } from "next/router";
import DefaultLayout from "@/components/Layouts/Layout";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.replace('/users/login');
  }, [router]);

  return null
}

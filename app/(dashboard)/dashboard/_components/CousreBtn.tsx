"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const CousreBtn = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/dashboard/courses/add")}>
      Add Course
    </Button>
  );
};

export default CousreBtn;

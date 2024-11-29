import React from "react";

import TutorialsContainer from "./tutorials-container";
import { Container } from "@/components/Container";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Cursor | Tutorials",
  description: "Learn how to use Cursor AI with these tutorials",
};

const page = () => {
  return (
    <Container className="flex w-full flex-col items-center justify-center gap-16 py-4">
      <BackgroundLines className="flex w-full flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-medium md:text-6xl">
          Start Cursor AI Tutorials
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Learn how to use Cursor AI with these tutorials
        </p>
      </BackgroundLines>

      <TutorialsContainer />
    </Container>
  );
};

export default page;

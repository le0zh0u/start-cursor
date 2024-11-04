import React from "react";

const AboutContent = () => {
  return (
    <div className="flex flex-col gap-2 text-lg font-medium leading-relaxed text-muted-foreground">
      <p>
        <span className="text-foreground">Start Cursor</span> is a project for{" "}
        <span className="text-foreground">
          collecting and sharing Cursor AI rules and tips
        </span>
        .{" "}
      </p>

      <p>
        In the <span className="text-foreground">future</span>, the{" "}
        <span className="text-foreground">developers</span> will be divided into{" "}
        <span className="text-foreground">
          two parts: coding with Cursor and the others.
        </span>
      </p>
      <p>
        Here is the place for helping all developers to get the most out of
        Cursor AI.
      </p>
      <p>
        This project is built by <span className="text-foreground">T3 App</span>
        , <span className="text-foreground">Next.js</span>,{" "}
        <span className="text-foreground">Shancn UI</span>,{" "}
        <span className="text-foreground">NeonDB</span> and{" "}
        <span className="text-foreground">Vercel</span> and other{" "}
        <span className="text-foreground">perfect libs</span>.
      </p>
    </div>
  );
};

export default AboutContent;

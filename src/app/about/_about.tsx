import AboutContent from "@/components/about/about-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const About = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-start">
          <h1 className="text-2xl font-semibold md:text-5xl">
            This is Start Cursor space. 🏰
          </h1>
          <p className="text-xl font-medium text-muted-foreground">
            Cursor AI is a big step for all developers.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Start Cursor wants to help you get the most out of Cursor AI.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-foreground">About</h2>
          <AboutContent />
        </div>

        <div className="flex flex-col gap-4 text-lg font-medium leading-relaxed text-muted-foreground">
          <div className="flex items-center justify-start gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>le0zh0u</AvatarFallback>
            </Avatar>
            <h2 className="text-4xl font-semibold text-foreground">
              Hi, I&apos;m le0zh0u 👋🏻
            </h2>
          </div>
          <div className="flex max-w-screen-md flex-col gap-2">
            <p>
              <span className="text-foreground">
                I&apos;m a full stack developer
              </span>{" "}
              who loves to build things for myself and others.
            </p>

            <p>
              When I first started using Cursor AI, I was{" "}
              <span className="text-foreground">amazed</span> by its
              capabilities. However,{" "}
              <span className="text-foreground">
                I found it difficult to find and share useful rules for my
                different projects
              </span>
              . So I decided to build this project to help others like me.
            </p>

            <p>
              If you have any questions or suggestions,{" "}
              <span className="text-foreground">
                please feel free to contact me
              </span>
              .
            </p>

            <ul className="flex flex-col gap-2 text-foreground">
              <li>
                <Link
                  href="https://github.com/le0zh0u"
                  className="flex items-center gap-2"
                >
                  <FaGithub /> GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/le0zh0u"
                  className="flex items-center gap-2"
                >
                  <FaTwitter /> X
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:leo@leozhou.me"
                  className="flex items-center gap-2"
                >
                  <MdEmail /> Email
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

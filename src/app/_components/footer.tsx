import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    title: "Start Cursor",
    links: [
      { name: "Cursor Rules", href: "/" },
      { name: "Cursor Ignore", href: "/cursorignore" },
    ],
  },
  {
    title: "Advanced",
    links: [
      { name: "Projects", href: "/projects" },
      { name: "Tutorials", href: "/tutorials" },
    ],
  },
  {
    title: "Related",
    links: [
      { name: "Cursor AI", href: "https://cursor.com" },
      { name: "About", href: "/about" },
    ],
  },
];

const Footer = () => {
  return (
    <Container className="py-4 lg:py-8">
      <footer>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div className="col-span-2 flex h-full items-center justify-between md:items-start lg:col-span-3 lg:flex-col">
            <Image src="/logo.jpg" width={32} height={32} alt="logo" />
            <h1 className="font-mono text-2xl font-bold">Start Cursor</h1>

            <ul className="flex items-center space-x-6 text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a href="mailto:leo@leozhou.me">
                  <MdEmail className="size-6" />
                </a>
              </li>

              <li className="font-medium hover:text-primary">
                <a href="https://twitter.com/le0zh0u">
                  <FaTwitter className="size-6" />
                </a>
              </li>
            </ul>
          </div>
          <Separator className="col-span-2 my-6 lg:hidden" />
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="space-y-4 text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="font-medium hover:text-primary">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-14 lg:my-20" />
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-3xl font-semibold lg:text-4xl">
              Join our newsletter
            </p>
            <p className="text-muted-foreground">
              Get exclusive news, features, and updates.
            </p>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input disabled type="email" placeholder="Email" />
            <Button disabled type="submit">
              Newsletter is comming
            </Button>
            {/* Subscribe */}
          </div>
        </div>
        <Separator className="my-14 lg:my-20" />
        <div className="flex flex-col justify-between gap-4 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
          <ul className="flex gap-4">
            <li className="underline hover:text-primary">
              {/* <a href="#"> Terms and Conditions</a> */}
            </li>
            <li className="underline hover:text-primary">
              {/* <a href="#"> Privacy Policy</a> */}
            </li>
          </ul>
          <p>© 2024 Start Cursor. All rights reserved.</p>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;

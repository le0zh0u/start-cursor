import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Cursor Admin",
  description: "Start Cursor Admin Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import AppNav from "@/app/components/AppNav/AppNav";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <>
      {children}
      <AppNav />
    </>
  );
}

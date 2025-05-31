import AppNav from "@/app/ui/AppNav/AppNav";

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

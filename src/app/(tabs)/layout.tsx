import { Dock, Fab } from "@/components/ui";

export default function TabsLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <Fab href="/new" />
      <Dock />
    </>
  );
}

import SideNav from "src/components/sidenav/SideNav";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className="flex flex-row max-w-[2000px] mx-auto px-0 lg:px-0">
      <SideNav />
      <section className="w-full lg:w-full lg:px-0">{children}</section>
    </main>
  );
}

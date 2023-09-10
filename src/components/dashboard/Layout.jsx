import SideNav from "src/components/sidenav/SideNav";

export default function Layout({ children }) {
  return (
    <main className="flex flex-row max-w-[2000px] mx-auto px-0 lg:px-0">
      <SideNav />
      <section className="w-5/6 h-screen relative lg:w-full lg:px-0">
        {children}
      </section>
    </main>
  );
}

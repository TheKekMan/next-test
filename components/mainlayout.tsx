import NavTabs from "./navtabs";

export default function MainLayout({ children }) {
  return (
    <>
      <NavTabs />
      <hr />
      <main>{children}</main>
    </>
  );
}

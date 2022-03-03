import NavTabs from "./NavTabs";

export default function MainLayout({ children }) {
  return (
    <>
      <NavTabs />
      <hr />
      <main>{children}</main>
    </>
  );
}

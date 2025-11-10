import NavBottom from "./NavBottom";
import NavMiddle from "./NavMiddle";
import NavTop from "./NavTop";

export default function Navbar() {
  return (
    <header className="bg-primary text-white">
      <NavTop />
      <NavMiddle />
      <NavBottom />
    </header>
  );
}

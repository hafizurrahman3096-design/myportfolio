import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold">
        Hafizur
      </h1>

      <div className="flex gap-6 text-lg">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}

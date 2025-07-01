import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">Mack Movies</div>
        <div className="flex space-x-4">
          <Link href="/sign-in" className="text-white">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-white">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

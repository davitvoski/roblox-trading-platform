import { Link } from "react-router-dom";

export default function Navbar() {
  const user = "";
  return (
    <>
      <nav className="h-[12%] border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900">
        <div className="container mx-auto flex h-full flex-wrap items-center justify-between">
          <div className="ml-4 flex gap-4">
            <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                HOME
              </Link>
            </li>
            <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                CHAT
              </Link>
            </li>
            <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                INVENTORY
              </Link>
            </li>
          </div>
          <div>
            <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              {user ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/logout">Logout</Link>
              )}
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

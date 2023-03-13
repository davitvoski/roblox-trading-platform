import { Link } from "react-router-dom";

export default function Navbar() {
  const user = "";
  return (
    <>
      <nav className="h-full w-full border-gray-200 bg-white px-2 dark:bg-gray-900">
        <div className="container mx-auto flex h-full flex-wrap items-center justify-between">
          <div className="flex justify-evenly gap-8">
            <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:bg-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                Home
              </Link>
            </span>
            <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:bg-action">
              <Link
                to="/inventory"
                className="inline-block hover:cursor-pointer "
              >
                Inventory
              </Link>
            </span>
            <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:bg-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                Chat
              </Link>
            </span>
          </div>
          <div className="flex gap-6">
            {user && (
              <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
                <Link
                  to="/profile"
                  state={{ user_created: "Logout Sucessfully" }}
                >
                  Profile
                </Link>
              </li>
            )}
            <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              {user ? (
                <Link
                  to="/logout"
                  state={{ user_created: "Logout Sucessfully" }}
                >
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

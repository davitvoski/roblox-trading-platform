import { Link } from "react-router-dom";

export default function Navbar() {
  const user = "";
  return (
    <>
      <nav className="h-full w-full  border-gray-200 bg-white px-2 dark:bg-gray-900">
        <div className="container mx-auto flex h-full flex-wrap items-center justify-between">
          <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:bg-action">
            dsadas
            <Link to="/" className="inline-block hover:cursor-pointer ">
              CHAT
            </Link>
          </span>
          <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
            <Link to="/" className="inline-block hover:cursor-pointer ">
              INVENTORY
            </Link>
          </span>
          {/* <div className="ml-4 flex gap-4 p-2">
            <span className="p-5 hover:cursor-pointer hover:bg-orange-400 ">
              dsadasdsa
              {/* <li className="list-none border-2 border-purple p-5 shadow-md  shadow-action hover:bg-orange-400">
                dsadasdaasd
              </li> */}
          {/* </span> */}

          {/* <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                CHAT
              </Link>
            </span>
            <span className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              <Link to="/" className="inline-block hover:cursor-pointer ">
                INVENTORY
              </Link>
            </span> */}
          {/* </div> */}
          <div>
            <li className="list-none border-2 border-purple p-2 shadow-md  shadow-action hover:text-action">
              {user ? (
                <Link to="/logout">Logout</Link>
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

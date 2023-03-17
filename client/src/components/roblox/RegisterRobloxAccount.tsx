import { Input, TextField } from "@mui/joy";
import axios, { AxiosError } from "axios";
import { FormEvent, MouseEventHandler, useState } from "react";
import randomWords from "random-words";

export default function RegisterRobloxAccount() {
  const [words, setWords] = useState<string[]>([]);
  const [gotId, setGotId] = useState<boolean>(false);
  const [error, setError] = useState("");

  async function checkAccount(e: FormEvent) {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value as string;

    await axios
      .get(`/api/roblox/users/${username}`)
      .then((res) => {
        const words = randomWords(5);
        setWords(words);
        setGotId(true);
        setError("")
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 401) {
          setError("Not Authorized");
        }

        if (err.response!.status === 404) {
          setError("User was not found");
        }
      });
  }

  async function verifyUser(e: FormEvent) {
    e.preventDefault();
    await axios
      .post("/api/roblox/users/verify", {
        words: words,
      })
      .then((res) => {})
      .catch((err) => {});
  }

  return (
    <>
      <section className="0 m-5 flex w-full items-center justify-center">
        <section className="-mt-40 flex flex-col items-center gap-5">
          {!gotId ? (
            <form
              id="roblox-form"
              className="flex flex-col items-center justify-center gap-4"
              onSubmit={checkAccount}
            >
              <h1 className="w-fit text-3xl">Let's Register </h1>
              <Input
                className="w-fit"
                name="username"
                placeholder="Enter Your Roblox Username"
                type="text"
                variant="outlined"
              />
              <button
                type="submit"
                form="roblox-form"
                className="w-1/2 self-center rounded-xl bg-sky-500 p-2 transition delay-100 ease-in-out hover:bg-action "
              >
                Link Account
              </button>
            </form>
          ) : (
            <form
              id="roblox-verify-form"
              className="flex flex-col items-center justify-center gap-4"
              onSubmit={verifyUser}
            >
              <h1 className="w-fit cursor-default text-xl md:text-3xl">
                Paste the letters in your Roblox Profile Description
              </h1>

              <h3 className="p-2 text-lg">{words.join("")}</h3>
              <button
                type="submit"
                className="w-1/4 self-center rounded-xl bg-sky-500 p-2 transition delay-100 ease-in-out hover:bg-action md:w-1/3 "
              >
                Verify Account
              </button>
            </form>
          )}
          {error && <h1 className="snap-center text-error"> {error}</h1>}
        </section>
      </section>
    </>
  );
}

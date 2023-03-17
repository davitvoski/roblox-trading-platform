import { Input } from "@mui/joy";
import axios from "axios";
import { FormEvent } from "react";

export default function RegisterRobloxAccount() {
  async function checkAccount(e: FormEvent) {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value as string;

    await axios
      .get(`/api/roblox/users/${username}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  return (
    <>
      <section className="0 m-5 flex w-full items-center justify-center">
        <section className="-mt-40 gap-5">
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
        </section>
      </section>
    </>
  );
}

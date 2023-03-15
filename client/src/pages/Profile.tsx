export default function Profile() {
  return (
    <section className="mt-52 flex h-full w-full flex-col md:mt-0 md:flex-row">
      <section className=" -mt-40 flex h-fit w-1/3 min-w-min flex-col items-center justify-center self-center ">
        <div className="h-52 w-52">
          <img
            className="h-full w-full rounded-full border border-gray-100 shadow-sm"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="user image"
          />
        </div>
        <h1 className=" w-fit text-5xl">davitvoski</h1>
      </section>
      <section className="m-5 w-2/3 border border-green-400"></section>
    </section>
  );
}

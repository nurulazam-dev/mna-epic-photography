const Login = () => {
  return (
    <div className="bg-[#dddeee] dark:bg-black px-[49px] py-[50px] min-h-screen">
      <form className="max-w-[500px] mx-auto bg-[#FFFFFF] dark:bg-black px-[28px] py-[32px] border-none rounded-[20px] space-y-3 grid grid-cols-2">
        <div className="col-span-full">
          <h2 className="bg-transparent text-[#37b8a3] text-[24px] font-[bold] rounded-[6px] text-center">
            Login
          </h2>
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">
            Email<span className="text-[red]"> *</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-transparent px-3 py-2 border-[1px] rounded w-full p-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">
            Password<span className="text-[red]"> *</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="bg-transparent px-3 py-2 border-[1px] rounded w-full p-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="col-span-full">
          <div className="justify-center">
            <button
              type="submit"
              className="bg-[#37b8a3] text-[#ffffff] text-[18px] rounded-[6px] px-[16px] py-[12px] w-[150px] text-center"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

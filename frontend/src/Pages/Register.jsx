const Register = () => {
  return (
    <div className="bg-[#A2ECDC] dark:bg-black px-[49px] py-[86px] min-h-screen">
      <form className="max-w-[600px] mx-auto bg-[#FFFFFF] dark:bg-black px-[28px] py-[32px] border-none rounded-[20px] space-y-3 grid grid-cols-2">
        <div className="col-span-full">
          <h2 className="bg-transparent text-[#37b8a3] text-[28px] font-[bold] rounded-[6px] text-center">
            Register
          </h2>
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">
            Name<span className="text-[red]"> *</span>
          </label>
          <input
            type="text"
            name="text"
            placeholder="Name"
            className="bg-transparent px-[2px] py-2 border-b-[2px] border-[#a2ecdc] w-full p-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">
            Email<span className="text-[red]"> *</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-transparent px-[2px] py-2 border-b-[2px] border-[#a2ecdc] w-full p-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">Phone</label>
          <input
            type="number"
            name="number"
            placeholder="Phone"
            className="bg-transparent px-[2px] py-2 border-b-[2px] border-[#a2ecdc] w-full p-2 focus:outline-none focus:border-blue-400"
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
            className="bg-transparent px-[2px] py-2 border-b-[2px] border-[#a2ecdc] w-full p-2 focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">Select</label>
          <select
            name="select"
            className="bg-transparent px-[2px] py-2 border-b-[2px] border-[#a2ecdc] w-full p-2 focus:outline-none focus:border-blue-400 rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
        <div className="col-span-full">
          <label className="font-medium text-black pb-1.5 block">File</label>
          <input
            type="file"
            name="file"
            placeholder=""
            className="bg-transparent px-[2px] py-2 border-b-[2px] border-[#a2ecdc] w-full p-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="col-span-full">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="single check"
              className="focus:ring focus:ring-blue-400"
            />
            <span>I accept terms & conditions</span>
          </label>
        </div>
        <div className="col-span-full">
          <div className="justify-center">
            <button
              type="submit"
              className="bg-[#20c997] text-[#ffffff] text-[18px] rounded-[30px] px-[16px] py-[12px] w-[200px] text-center"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;

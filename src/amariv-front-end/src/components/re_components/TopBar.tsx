import DynamicIcon from "./DynamicIcon";

type props = {
  OnClickBack?: () => void
  title: string
  backButton?: boolean
}

function TopBar({ OnClickBack, title, backButton = true }: props) {
  return (
    <div className="flex h-[65px] w-full bg-primary-green text-white p-4 items-center lg:rounded-t-xl">
      {
        backButton == true &&
        <div onClick={OnClickBack} className="ml-2 cursor-pointer mr-6">
          <DynamicIcon iconName="IconArrowBack" size={30} />
        </div>
      }
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
}

export default TopBar;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../store/channelSlice";
import { BsChatRight, BsList, BsPlusCircle } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Channel } from "../../utils/types";

type Props = {
  channels: Channel[];
  addChannel: () => Promise<void>;
};

export function HamburgerMenu({ channels, addChannel }: Props) {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="mr-1 flex cursor-pointer items-center justify-start hover:text-gray-500">
        <BsList
          onClick={() => setSidebar(!sidebar)}
          className="bg-none text-3xl"
        />
      </div>
      <nav
        className={`transition-left fixed top-0 flex h-full w-56 justify-center bg-gray-800 ${
          sidebar ? "left-0" : "-left-full"
        }`}
      >
        <ul className="w-full" onClick={() => setSidebar(!sidebar)}>
          <li className="flex w-full cursor-pointer items-center p-4 hover:text-gray-500">
            <AiOutlineClose size={20} />
          </li>
          <div className="mb-1 flex items-center justify-between px-4">
            <h3 className="text-lg">Chat List</h3>
            <BsPlusCircle
              className="cursor-pointer hover:text-gray-500"
              size={20}
              onClick={() => addChannel()}
            />
          </div>
          {channels.map((data) => (
            <div
              key={data.id}
              onClick={() =>
                dispatch(
                  setChannelInfo({
                    channelId: data.id,
                    channelName: data.channel.channelName,
                  })
                )
              }
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md py-2 px-6 text-sm hover:bg-gray-700"
            >
              <BsChatRight />
              <h4 className="flex pb-1">{data.channel.channelName}</h4>
            </div>
          ))}
        </ul>
      </nav>
    </>
  );
}

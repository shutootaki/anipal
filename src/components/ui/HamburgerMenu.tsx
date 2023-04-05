import { useState } from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../store/channelSlice";
import { BsChatRight, BsList, BsPlusCircle } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Channel } from "../../utils/types";
import { Avatar } from "@mui/material";
import { characterImage } from "../../utils/constants";
import { Profile } from "../features/userSetting/Profile";

type Props = {
  channels: Channel[];
  addChannel?: () => Promise<void>;
};

export const HamburgerMenu = ({ channels }: Props) => {
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
        <ul className="relative w-full" onClick={() => setSidebar(!sidebar)}>
          <li className="flex w-full cursor-pointer items-center p-4 hover:text-gray-500">
            <AiOutlineClose size={20} />
          </li>
          <div className="mb-1 flex items-center justify-between px-4">
            <h3 className="text-lg">Chat List</h3>
          </div>
          {channels.map((data) => {
            const channelName = data.channel.channelName;
            return (
              <div
                key={data.id}
                onClick={() =>
                  dispatch(
                    setChannelInfo({
                      channelId: data.id,
                      channelName,
                    })
                  )
                }
                className="flex cursor-pointer items-center justify-start gap-2 rounded-md px-6 py-2 text-sm hover:bg-gray-700"
              >
                <Avatar
                  src={characterImage[channelName]}
                  sx={{ width: 24, height: 24 }}
                />
                <h4 className="flex pb-1">{data.channel.channelName}</h4>
              </div>
            );
          })}
          <Profile />
        </ul>
      </nav>
    </>
  );
};

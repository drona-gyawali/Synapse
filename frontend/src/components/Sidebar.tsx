import { BrainCogIcon } from 'lucide-react';
import {
  TwitterIcon,
  Settings2Icon,
  VideoIcon,
  NotebookTabsIcon,
  HomeIcon,
} from 'lucide-react';
import { type SetURLSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Setting from './Setting';

const defaultStyle =
  'mt-[10%]  flex  items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer';
const proStyle =
  'mt-[10%] flex items-center gap-4  hover:bg-gray-200 bg-gray-200 p-2 rounded-lg cursor-pointer';

interface tab {
  currentTab?: string;
  setSearchParams: SetURLSearchParams;
}

export function Sidebar(props: tab) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="h-screen bg-white border-r border-gray-200 w-72 fixed left-0 top-0">
      <div className="p-5 ">
        <div className="flex items-center  gap-5 ">
          <div className="text-blue-500">{<BrainCogIcon size={30} />}</div>
          <div className="font-bold bg-blue-500 text-white p-2 rounded-lg text-1xl cursor-pointer">
            Synapse
          </div>
        </div>
        <div
          className={props.currentTab !== 'all' ? defaultStyle : proStyle}
          onClick={() => props.setSearchParams({ tab: 'all' })}
        >
          <div className="text-gray-400 ">{<HomeIcon size={27} />}</div>
          <div className="font-bold  hover:text-gray-500 text-gray-500 cursor-pointer">
            Home
          </div>
        </div>
        <div
          onClick={() => props.setSearchParams({ tab: 'x' })}
          className={props.currentTab !== 'x' ? defaultStyle : proStyle}
        >
          <div className="text-gray-400 ">{<TwitterIcon size={27} />}</div>
          <div className="font-bold  hover:text-gray-500 text-gray-500 cursor-pointer">
            Tweets
          </div>
        </div>
        <div
          onClick={() => props.setSearchParams({ tab: 'youtube' })}
          className={props.currentTab !== 'youtube' ? defaultStyle : proStyle}
        >
          <div className="text-gray-400 ">{<VideoIcon size={27} />}</div>
          <div
            onClick={() => props.setSearchParams({ tab: 'youtube' })}
            className="font-bold hover:text-gray-500 text-gray-500 cursor-pointer"
          >
            Videos
          </div>
        </div>
        <div
          onClick={() => props.setSearchParams({ tab: 'pdf' })}
          className={props.currentTab !== 'pdf' ? defaultStyle : proStyle}
        >
          <div className="text-gray-400 ">{<NotebookTabsIcon size={27} />}</div>
          <div className="font-bold hover:text-gray-500 text-gray-500 cursor-pointer">
            Documents
          </div>
        </div>

        <Setting open={modalOpen} close={() => setModalOpen(false)} />
        <div
          onClick={() => {
            setModalOpen(true);
          }}
          className={props.currentTab !== 'setting' ? defaultStyle : proStyle}
        >
          <div className="text-gray-400 ">{<Settings2Icon size={27} />}</div>
          <div className="font-bold hover:text-gray-500 text-gray-500 cursor-pointer">
            Setting
          </div>
        </div>
      </div>
    </div>
  );
}

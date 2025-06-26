"use client";

import { useCallback, useState } from "react";
import { images } from "@/assets/images";
import Image from "next/image";
import { MadeWithLove } from "@/components/shared";
import { AppSidebar } from "@/components/layout";
import { Message, PromptBox } from "@/components/features/chat";
import { ROLES } from "@/constants";

export default function ChatPage() {
  const [isExpand, setIsExpand] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleExpand = useCallback((state: boolean) => {
    setIsExpand(state);
  }, []);

  const handleLoading = useCallback((state: boolean) => {
    setIsLoading(state)
  }, []);

  console.log(setMessages)

  return (
    <>
      <div className="flex h-screen">
        <AppSidebar expand={isExpand} setExpand={handleExpand} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => isExpand ? handleExpand(false) : handleExpand(true)}
              className="rotate-180"
              src={images.menu_icon}
              alt="menu_icon"
            />
            <Image
              className="opacity-70"
              src={images.chat_icon}
              alt="chat_icon"
            />
          </div>

          {messages.length === 0 ? (<>
            <div className="flex items-center gap-3">
              <Image
                src={images.logo_icon}
                alt="logo_icon"
                className="w-14"
              />
              <p className="text-2xl font-medium">Hi, I&apos;m DeepSeek.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
          </>) : (<>
            <div>
              <Message role={ROLES.USER} content="What is LLMs" />
            </div>
          </>)}
          <PromptBox isLoading={isLoading} setLoading={handleLoading} />

          <div className="text-xs absolute bottom-1 text-gray-500 flex flex-col gap-1">
            <p>AI-generated, for reference only</p>
            <MadeWithLove name="Zehan Khan" url={"https://github.com/zehan12"} />
          </div>
        </div>
      </div>
    </>
  );
}

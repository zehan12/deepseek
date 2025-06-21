import { images } from "@/assets/images";
import { useClerkAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { FC, memo, useMemo, useState } from "react";
import { ChatLabel } from "./ChatLabels";

interface AppSidebar {
    expand: boolean;
    setExpand: (state: boolean) => void;
}

export function getSidebarAssets(expand: boolean) {
    return {
        logoSrc: expand ? images.logo_text : images.logo_icon,
        logoAlt: "DeepSeek logo",

        sidebarIconSrc: expand ? images.sidebar_close_icon : images.sidebar_icon,
        sidebarIconAlt: expand ? "Close sidebar" : "Open sidebar",

        chatIconSrc: expand ? images.chat_icon : images.chat_icon_dull,
        chatIconAlt: expand ? "New chat" : "New chat (inactive)",

        phoneIconSrc: expand ? images.phone_icon : images.phone_icon_dull,
        phoneIconAlt: "Get DeepSeek app",

        menuIconSrc: images.menu_icon,
        menuIconAlt: "Open menu",

        profileAlt: "User profile",
        qrcodeAlt: "QR code to download DeepSeek app",
    };
}

export const AppSidebar: FC<AppSidebar> = memo(({ expand, setExpand }) => {

    const { user, openSignIn } = useClerkAuth();
    const [openActionMenu, setOpenActionMenu] = useState<{ id: number, open: boolean }>({ id: 0, open: false });

    const handleActionMenu = (state: boolean) => {
        // setOpenActionMenu(state);
    }

    const assets = useMemo(() => getSidebarAssets(expand), [expand]);


    return (<>
        <aside className={cn("flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen",
            expand ? 'p-4 w-64' : 'md:w-20  w-0 max-md:overflow-hidden'
        )}>
            <div>
                <div className={cn('flex', expand ? 'flex-row gap-10' : 'flex-col items-center gap-8')}>
                    <Image
                        className={cn(expand ? 'w-36' : 'w-10')}
                        src={assets.logoSrc}
                        alt={assets.logoAlt}
                    />
                    <div
                        onClick={() => setExpand(!expand)}
                        className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer">
                        <Image
                            src={assets.menuIconSrc}
                            alt={assets.menuIconAlt}
                            className="md:hidden"
                        />
                        <Image
                            src={assets.sidebarIconSrc}
                            alt={assets.sidebarIconAlt}
                            className="hidden md:block w-7"
                        />
                        <div className={cn("absolute w-max",
                            expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0",
                            "opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none"
                        )}>
                            {expand ? 'Close Sidebar' : 'Open Sidebar'}
                            <div className={cn("w-3 h-3 absolute bg-black rotate-45 ",
                                expand ? "left-1/2 -top-1.5 -translate-x-1/2" : "left-4 -bottom-1.5"
                            )}></div>
                        </div>
                    </div>
                </div>
                <button className={cn("mt-8 flex items-center justify-center cursor-pointer",
                    expand ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
                        : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
                )}>
                    <Image
                        className={expand ? 'w-6' : 'w-7'}
                        src={assets.chatIconSrc}
                        alt={assets.chatIconAlt}
                    />
                    <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
                        New Chat
                        <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
                    </div>
                    {expand && (<>
                        <p className="text-white font-medium">New Chat</p>
                    </>)}
                </button>

                <div className={cn("mt-8 text-white/25 text-sm", expand ? "block" : "hidden")}>
                    <p className="my-1">
                        Recents
                    </p>
                    <ChatLabel openMenu={openActionMenu} setOpenMenu={handleActionMenu} />
                </div>
            </div>

            <div>
                <div className={cn("flex items-center cursor-pointer group relative",
                    expand ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10 cursor-pointer"
                        : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
                )}>
                    <Image
                        className={cn(expand ? "w-5" : "w-6.5 mx-auto")}
                        src={assets.phoneIconSrc}
                        alt={assets.phoneIconAlt}
                    />
                    <div className={cn("absolute -top-60 pb-8",
                        !expand && "-right-40",
                        "opacity-0 group-hover:opacity-100 hidden group-hover:block transition "
                    )}>
                        <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
                            <Image
                                className="w-44"
                                src={images.qrcode}
                                alt={assets.qrcodeAlt}
                            />
                            <p>Scan to get DeepSeek App</p>
                            <div className={cn("w-3 h-3 absolute bg-black rotate-45 -bottom-1.5",
                                expand ? "right-1/2" : "left-4"
                            )}></div>
                        </div>

                    </div>
                    {expand && (
                        <>
                            <span>
                                Get App
                            </span>
                            <Image
                                src={images.new_icon}
                                alt="new_icon"
                            />
                        </>
                    )}
                </div>
                <div
                    onClick={() => user ? null : openSignIn()}
                    className={cn("flex items-center",
                        expand ? "hover:bg-white/10 rounded-lg"
                            : "justify-center w-full",
                        "gap-3 text-sm text-white/50 p-2 mt-2 cursor-pointer"
                    )}>
                    {
                        user ? (<UserButton />) : (
                            <Image
                                className="w-7"
                                src={images.profile_icon}
                                alt={assets.profileAlt}
                            />
                        )
                    }
                    {expand && <span>My Profile</span>}
                </div>
            </div>
        </aside>
    </>)
})

AppSidebar.displayName = "AppSidebar"
import { images } from "@/assets/images";
import { ROLES } from "@/constants";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { FC, memo } from "react";

interface MessageProps {
    role: string;
    content: string;
}

export const Message: FC<MessageProps> = memo(({ role, content }) => {
    return (<>
        <div className="flex flex-col items-center w-full max-w-3xl text-sm">
            <div className={cn("flex flex-col w-full mb-8",
                role === ROLES.USER && "items-end"
            )}>
                <div className={cn("group relative flex max-w-2xl py-3 rounded-xl",
                    role === ROLES.USER ? "bg-[#414158]" : "gap-3"
                )}>
                    <div className={cn(" opacity-0 group-hover:opacity-100 absolute transition-all",
                        role === ROLES.USER ? "-left-6 -top-2.5" : "left-9 -bottom-6"
                    )}>
                        <div className="flex items-center gap-2 opacity-70">
                            {
                                role === ROLES.USER ? (<>
                                    <Image
                                        className="w-4.5 cursor-pointer"
                                        src={images.copy_icon}
                                        alt="Copy Icon"
                                    />
                                    <Image
                                        className="w-4.5 cursor-pointer"
                                        src={images.pencil_icon}
                                        alt="Pencil Icon"
                                    />
                                </>) : (<>
                                    <Image
                                        className="w-4.5 cursor-pointer"
                                        src={images.copy_icon}
                                        alt="Copy Icon"
                                    />
                                    <Image
                                        className="w-4.5 cursor-pointer"
                                        src={images.regenerate_icon}
                                        alt="Regenerate Icon"
                                    />   <Image
                                        className="w-4.5 cursor-pointer"
                                        src={images.like_icon}
                                        alt="Like Icon"
                                    />
                                    <Image
                                        className="w-4.5 cursor-pointer"
                                        src={images.dislike_icon}
                                        alt="Dislike Icon"
                                    />
                                </>)
                            }
                        </div>
                    </div>
                    {
                        role === ROLES.USER
                            ? (<>
                                <span className="text-white/90">
                                    {content}
                                </span>
                            </>)
                            : (<>
                                <Image
                                    className="h-9 w-9 p-1 border border-white/15 rounded-full"
                                    src={images.logo_icon}
                                    alt="DeepSeek Logo"
                                />
                                <div className="space-y-4 w-full overflow-scroll">
                                    {content}
                                </div>
                            </>)
                    }
                </div>
            </div>
        </div>
    </>)
});

Message.displayName = "Message";
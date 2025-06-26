import { images } from "@/assets/images"
import { cn } from "@/libs/utils";
import Image from "next/image"
import { FC, memo } from "react"

interface ChatLabelProps {
    openMenu: { id: number, open: boolean },
    setOpenMenu: (state: boolean) => void;
}

export const ChatLabel: FC<ChatLabelProps> = memo(({ openMenu, setOpenMenu }) => {
    console.log(setOpenMenu)
    return (<>
        <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
            <p className="group-hover:max-w-5/6 truncate">Chat Name Here</p>
            <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
                <Image
                    src={images.three_dots}
                    alt="Three Dots Icon"
                    className={cn("w-4", openMenu?.open ? "" : "hidden", "group-hover:block")}
                />
                <div className={cn("absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2", openMenu?.open ? "block" : "hidden")}>
                    <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                        <Image
                            src={images.pencil_icon}
                            alt="Pencil Icon"
                            className="w-4"
                        />
                        <p>Rename</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                        <Image
                            src={images.delete_icon}
                            alt="Delete Icon"
                            className="w-4"
                        />
                        <p>Delete</p>
                    </div>
                </div>
            </div>

        </div>
    </>)
});

ChatLabel.displayName = "ChatLabel";
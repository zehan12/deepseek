"use client";
import { images } from "@/assets/images";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { ChangeEvent, FC, memo, useState } from "react";

interface PromptBoxProps {
    isLoading: boolean;
    setLoading: (state: boolean) => void;
};

export const PromptBox: FC<PromptBoxProps> = memo(({ isLoading, setLoading }) => {

    const [prompt, setPrompt] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value)
    }

    return (<>
        <form className={cn("w-full",
            false ? "max-w-3xl" : "max-w-2xl",
            "bg-[#404045] p-4 rounded-3xl mt-4 transition-all"
        )}>
            <textarea
                className="outline-none w-full  resize-none overflow-hidden break-words bg-transparent"
                rows={2}
                placeholder="Message DeepSeek"
                value={prompt}
                onChange={handleChange}
                required
            />
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 text-xs border border-gray-300/40
                            px-2 py-1 rounded-full cursor-pointer 
                            hover:bg-gray-500/20 transition">
                        <Image
                            className="h-5"
                            src={images.deepthink_icon}
                            alt="Deek Think Icon"
                        />
                        DeepThink (R1)
                    </p>
                    <p className="flex items-center gap-2 text-xs border border-gray-300/40
                            px-2 py-1 rounded-full cursor-pointer 
                            hover:bg-gray-500/20 transition">
                        <Image
                            className="h-5"
                            src={images.search_icon}
                            alt="Search Icon"
                        />
                        Search
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Image
                        className="w-4 cursor-pointer"
                        src={images.pin_icon}
                        alt="Pin Icon"
                    />
                    <button className={cn(prompt ? "bg-primary" : "bg-[#71717a]",
                        "rounded-full p-2 cursor-pointer"
                    )}>
                        <Image
                            className="w-3.5 aspect-square"
                            src={prompt ? images.arrow_icon : images.arrow_icon_dull}
                            alt={prompt ? "Arrow Icon" : "Arrow Icon Dull"}
                        />
                    </button>
                </div>
            </div>
        </form>
    </>)
});

PromptBox.displayName = "PromptBox"
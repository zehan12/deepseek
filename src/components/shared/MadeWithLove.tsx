import { FC } from "react";

export const MadeWithLove: FC<{ name: string, url: string }> = ({ name, url }) => {
    return (<div className="text-center">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
        >
            {name}
        </a>
    </div>)
}
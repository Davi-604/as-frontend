import Link from "next/link"
import { IconType } from "react-icons"

type Props = {
    IconElement: IconType,
    label?: string,
    onClick?: () => void,
    href?: string,
    target?: string,
    replace?: boolean,
}

export const ItemButton = ({IconElement, label, onClick, href, target, replace}: Props) => {
    const content = (
        <div className="flex flex-col justify-center items-center gap-2 p-3 md:flex-row">
            <div><IconElement /></div>
            {label && <div>{label}</div>}
        </div>
    )

    return (
        <div className="rounded-md transition-colors ease-in hover:bg-gray-800">
            {!onClick && href &&
                <Link 
                    href={href}
                    replace={replace}
                    target={target}
                >
                    {content}
                </Link>
            }
            {!href && onClick &&
                <div onClick={onClick} className="cursor-pointer">
                    {content}
                </div>
            }
        </div>
    )
}
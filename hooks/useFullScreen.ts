import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type OutputUseFullScreen = {
    isFullScreen: boolean
    enterFullScreen: () => void
}
export const useFullScreen = (): OutputUseFullScreen => {

    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

    useEffect(() => {
        const fullscreen = searchParams.get("fullscreen") === "true"
        setIsFullScreen(fullscreen)
    }, [searchParams])

    const enterFullScreen = () => {
        router.replace(`${pathName}?fullscreen=true`)
    }

    return {
        isFullScreen,
        enterFullScreen,
    }
}
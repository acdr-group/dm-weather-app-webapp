import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/joy";
import {SxProps} from "@mui/system";

type ContainerSize = {
    width: number,
    height: number,
}
type Props = {
    initialSize?: ContainerSize
    children: (containerSize: ContainerSize) => React.ReactNode
}

/**
 * ResponsivSizingComponent is a React functional component that provides responsive sizing behavior to its children.
 *
 * @param {object} props - The component props
 * @param {ContainerSize} props.initialSize - The initial size of the container
 * @param {function} props.children - The render function for the children that takes the container size as an argument
 * @returns {React.Element} - The rendered component
 */
const ResponsivSizingComponent: React.FC<Props> = (props: Props) => {

    const containerRef = useRef<HTMLDivElement | null>(null)
    const [containerSize, setContainerSize] = useState<ContainerSize | undefined>(props.initialSize)

    useEffect(() => {
        window.addEventListener("resize", resizeChild)
        return () => {
            window.removeEventListener("resize", resizeChild)
        }
    }, [])

    useEffect(() => {
        resizeChild()
    }, [containerRef])

    useEffect(() => {
        console.log("Container size: ", containerSize)
    }, [containerSize])

    const resizeChild = () => {
        if (!containerRef.current) return
        const size = {
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        }
        setContainerSize(size)
    }

    return (
        <Box component="div" ref={containerRef} sx={container}>
            {containerSize ? props.children(containerSize) : null}
        </Box>
    )
}

const container: SxProps = {
    width: "100%",
    height: "100%",
}

export default ResponsivSizingComponent

import React from 'react';
import Typography from "@mui/joy/Typography";
import {Box} from "@mui/joy";
import {SxProps} from "@mui/system";
import Image from "next/image";

type Props = {}
const CompanyLogoComponent: React.FC<Props> = (props: Props) => {
    return (
        <Box sx={logoContainer}>
            <Image
                src={"/logo.png"}
                alt={"company-logo"}
                width={30}
                height={30}
            />
            <Typography level="title-md" sx={logoText}>
                Wetter
            </Typography>
        </Box>
    )
}
const logoContainer: SxProps = {
    display: "flex",
    gap: 1,
}

const logoText: SxProps = {
    display: {
      lg: "block",
      xs: "none",
    },
    fontSize: 20,
    fontWeight: "400",
}

export default CompanyLogoComponent

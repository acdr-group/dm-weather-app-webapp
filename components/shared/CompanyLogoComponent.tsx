import React from "react";
import Typography from "@mui/joy/Typography";
import {Box} from "@mui/joy";
import {SxProps} from "@mui/system";
import Image from "next/image";
import CompanyLogo from "../../public/dm-logo.svg";

const CompanyLogoComponent: React.FC = () => {
    return (
        <Box sx={logoContainer}>
            <Image
                src={CompanyLogo}
                alt={"company-logo"}
                width={35}
                height={35}
            />
            <Typography level="title-md" sx={logoText}>
                Wetter
            </Typography>
        </Box>
    )
}
const logoContainer: SxProps = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    gap: 3,
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

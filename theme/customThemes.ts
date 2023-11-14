import { extendTheme } from '@mui/joy/styles';
import {Theme} from "@mui/joy";
import {ThemeItem} from "@/contexts/themeContext";

declare module '@mui/joy/styles' {}

const amberTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#fff8e1",
                    "100": "#ffecb3",
                    "200": "#ffe082",
                    "300": "#ffd54f",
                    "400": "#ffca28",
                    "500": "#ffc107",
                    "600": "#ffb300",
                    "700": "#ffa000",
                    "800": "#ff8f00",
                    "900": "#ff6f00"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#ffc107",
                    "600": "#ffb300",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const blueGreytheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#eceff1",
                    "100": "#cfd8dc",
                    "200": "#b0bec5",
                    "300": "#90a4ae",
                    "400": "#78909c",
                    "500": "#607d8b",
                    "600": "#546e7a",
                    "700": "#455a64",
                    "800": "#37474f",
                    "900": "#263238"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#607d8b",
                    "600": "#546e7a",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const stoneTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#fafaf9",
                    "100": "#f5f5f4",
                    "200": "#e7e5e4",
                    "300": "#d6d3d1",
                    "400": "#a8a29e",
                    "500": "#78716c",
                    "600": "#57534e",
                    "700": "#44403c",
                    "800": "#292524",
                    "900": "#1c1917"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#78716c",
                    "600": "#57534e",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const cyanTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#e0f7fa",
                    "100": "#b2ebf2",
                    "200": "#80deea",
                    "300": "#4dd0e1",
                    "400": "#26c6da",
                    "500": "#00bcd4",
                    "600": "#00acc1",
                    "700": "#0097a7",
                    "800": "#00838f",
                    "900": "#006064"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#00bcd4",
                    "600": "#00acc1",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const deepPurpleTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#ede7f6",
                    "100": "#d1c4e9",
                    "200": "#b39ddb",
                    "300": "#9575cd",
                    "400": "#7e57c2",
                    "500": "#673ab7",
                    "600": "#5e35b1",
                    "700": "#512da8",
                    "800": "#4527a0",
                    "900": "#311b92"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#673ab7",
                    "600": "#5e35b1",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const greyTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#fafafa",
                    "100": "#f5f5f5",
                    "200": "#eeeeee",
                    "300": "#e0e0e0",
                    "400": "#bdbdbd",
                    "500": "#9e9e9e",
                    "600": "#757575",
                    "700": "#616161",
                    "800": "#424242",
                    "900": "#212121"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#9e9e9e",
                    "600": "#757575",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const blueTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#e3f2fd",
                    "100": "#bbdefb",
                    "200": "#90caf9",
                    "300": "#64b5f6",
                    "400": "#42a5f5",
                    "500": "#2196f3",
                    "600": "#1e88e5",
                    "700": "#1976d2",
                    "800": "#1565c0",
                    "900": "#0d47a1"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#2196f3",
                    "600": "#1e88e5",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const deepOrangeTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#fbe9e7",
                    "100": "#ffccbc",
                    "200": "#ffab91",
                    "300": "#ff8a65",
                    "400": "#ff7043",
                    "500": "#ff5722",
                    "600": "#f4511e",
                    "700": "#e64a19",
                    "800": "#d84315",
                    "900": "#bf360c"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#ff5722",
                    "600": "#f4511e",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const greenTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#f0fdf4",
                    "100": "#dcfce7",
                    "200": "#bbf7d0",
                    "300": "#86efac",
                    "400": "#4ade80",
                    "500": "#22c55e",
                    "600": "#16a34a",
                    "700": "#15803d",
                    "800": "#166534",
                    "900": "#14532d"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#22c55e",
                    "600": "#16a34a",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const pinkTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#fdf2f8",
                    "100": "#fce7f3",
                    "200": "#fbcfe8",
                    "300": "#f9a8d4",
                    "400": "#f472b6",
                    "500": "#ec4899",
                    "600": "#db2777",
                    "700": "#be185d",
                    "800": "#9d174d",
                    "900": "#831843"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#ec4899",
                    "600": "#db2777",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

const neutralTheme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    "50": "#fafafa",
                    "100": "#f5f5f5",
                    "200": "#e5e5e5",
                    "300": "#d4d4d4",
                    "400": "#a3a3a3",
                    "500": "#737373",
                    "600": "#525252",
                    "700": "#404040",
                    "800": "#262626",
                    "900": "#171717"
                }
            }
        },
        "dark": {
            "palette": {
                "primary": {
                    "50": "#f8fafc",
                    "100": "#f1f5f9",
                    "200": "#e2e8f0",
                    "300": "#cbd5e1",
                    "400": "#94a3b8",
                    "500": "#737373",
                    "600": "#525252",
                    "700": "#334155",
                    "800": "#1e293b",
                    "900": "#0f172a"
                }
            }
        }
    }
})

export const customThemes: ThemeItem[] = [
    {
        name: "Amber",
        value: amberTheme,
    },
    {
        name: "Blue grey",
        value: blueGreytheme,
    },
    {
        name: "Stone",
        value: stoneTheme,
    },
    {
        name: "Cyan",
        value: cyanTheme,
    },
    {
        name: "Deep purple",
        value: deepPurpleTheme,
    },
    {
        name: "Grey",
        value: greyTheme,
    },
    {
        name: "Blue",
        value: blueTheme,
    },
    {
        name: "Deep orange",
        value: deepOrangeTheme,
    },
    {
        name: "Green",
        value: greenTheme,
    },
    {
        name: "Pink",
        value: pinkTheme
    },
    {
        name: "Neutral",
        value: neutralTheme,
    },
]

export default amberTheme
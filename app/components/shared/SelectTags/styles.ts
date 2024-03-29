

export const customFormStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        border: "2px solid transparent",
        boxShadow: 'none',
        borderRadius: "8px",
        paddingLeft: "11px",
        paddingRight: "11px",
        paddingTop: "6px",
        paddingBottom: "6px",
        "&:hover": {
            border: "2px solid #c3d9ed",
        }, "&:focus": {
            border: "2px solid #c3d9ed",
        },
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#c3d9ed" : "white",
        color: state.isFocused ? "black" : "black",
    }),
    placeholder: (provided: any) => ({
        ...provided,
        fontsSize: "20px",
        fontFamily: "Arial",
        fontWeight: "400",
        lineHeight: "23px",
        color: "#757575",
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: "none",
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "8px 12px",
        gap: "8px",
        width: "auto",
        height: "34px",
        background: " #104D85",
        borderRadius: " 24px",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "18px",
        color: "#FFFFFF",
        order: "0",
        flexGrow: "0",

    }),
    multiValue: (base: any) => ({
        ...base,
        borderRadius: "24px",
        background: "#104D85",
        marginLeft: "4px",
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: "#ffffff",
        borderRadius: "24px",
        "&:hover": {
            color: "#ffffff",
        },
    }),
};
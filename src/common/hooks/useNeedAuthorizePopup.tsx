import { useEffect, useState } from "react";

import { Box, Button, Typography } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectAccount } from "../../features/authSlice";

export const useNeedAuthorization = () => {
    const account = useAppSelector(selectAccount);


    const [isOpen, setIsOpen] = useState(false);
    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        setIsOpen(!account);
    }, [account])



    const needAuthorizationComponent = (
        <Box>
            <Typography variant="h6">Please log in</Typography>

            <Typography variant="caption" color="textSecondary">Click connect to view this page.</Typography>

        </Box>

    )
    return {
        needAuthorizationComponent,
        shouldShowNeedAuthorizationComponent: isOpen
    }
}
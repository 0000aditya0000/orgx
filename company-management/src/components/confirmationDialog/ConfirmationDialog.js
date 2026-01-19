import React from "react";
import Dialog from "@mui/material/Dialog";
import { Box, Card, Stack, Typography } from "@mui/material";


export default function ConfirmationDialog({ title, body, open, onConfirmAction, onCancelAction, cancelLabel, confirmLabel }) {
    const onConfirmHandler = () => {
        onConfirmAction();
        onCancelAction();
    }
    return (
        <div>
            <Dialog open={open} fullWidth sx={{ borderRadius: "0"}}>
                <Card
                    sx={{
                        width: "100%",
                        borderRadius: "0",
                        pt: 1,
                    }}
                >
                    <Box pt={3} pb={3} px={3}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mb={0.5}
                            alignItems="left"
                            alignContent="left"
                            sx={{ width: "100%" }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight="light"
                            mb={2}
                            // sx={{color: "inherit"}}
                        >
                            {body}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <nash-button transform="uppercase" type="raised" color="danger" onClick={onConfirmHandler}>{confirmLabel}</nash-button>
                            <nash-button transform="uppercase" type="raised" color="#F5F6F8" onClick={onCancelAction}>{cancelLabel}</nash-button>
                        </Stack>
                    </Box>
                </Card>
            </Dialog>
        </div>
    )
}
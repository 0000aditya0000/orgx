import { Box, Button, Card, Dialog, Input, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import React from "react"

const EditDialog = ({ openEdit, handleEditClose, code, name, email, status, getInfo, id, onEditQuestionComplete }) => {
    const [inputName, setName] = useState(name)
    const [inputCode, setCode] = useState(code)
    const [inputEmail, setEmail] = useState(email)
    const [correctEmail, setCorrectEmail] = useState(true);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [inputStatus, setInputStatus] = useState(status)
    const [open, setOpen] = useState(false);
    const [validStatus, setValidStatus] = useState(false);
    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };
    const onNameChange = (event) => {
        setName(event.target.value)
         if (event.target.value.length >0) {
            setValidName(false)
        }
        else {
            setValidName(true)
        }
    }
    const onCodeChange = (event) => {
        setCode(event.target.value)
        if (event.target.value.length >0) {
            setValidCode(false)
        }
        else {
            setValidCode(true)
        }
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value)
        if (!isValidEmail(event.target.value)) {
            setCorrectEmail(false)
        }
        else if (event.target.value.length <= 0) {
            setCorrectEmail(false)
        }
        else {
            setCorrectEmail(true)
        }
        if (!stringPatternValidation(event.target.value)) {
            setValidEmail(false)
        } else if (event.target.value.length >= 0) {
            setValidEmail(true)
        }
        else {
            setValidEmail(true)
        }
    }
    function onBlurNameHandler() {
        if (inputName.length <= 0) {
            setValidName(true);
        }
    }
    function onBlurCodeHandler() {
        if (inputCode.length <= 0) {
            setValidCode(true);
        }
    }
    function onBlurEmailHandler() {
        if (inputEmail.length <= 0) {
            setValidEmail(true);
            setCorrectEmail(true);
        }
    }
    function onBlurStatusHandler() {
        if (inputStatus.length <= 0) {
            setValidStatus(true);
        }
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function stringPatternValidation(stringVal) {
        return /\s/g.test(stringVal);
    };
    const onStatusChange = (event) => {
        setInputStatus(event.target.value)
        if (!stringPatternValidation(event.target.value)) {
            setValidStatus(false)
        } else if (event.target.value.length >= 0) {
            setValidStatus(true)
        }
        else {
            setValidStatus(true)
        }
    }
    const confirmEditActionHandler = async () => {
        const newData = { studio_code: inputCode, studio_name: inputName, studioAdmin_email: inputEmail, status: inputStatus };
        await fetch(`https://microfeapi.azurewebsites.net/studios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(newData)
        }).then((response) => { onEditQuestionComplete(response) })
        getInfo();
        handleEditClose();
    };
    const closeDeleteActionHandler = () => {
        setOpen(false);
    };
    return (
        <Dialog open={openEdit} fullWidth onClose={handleEditClose} sx={{ borderRadius: "0" }}>
            <Card
                sx={{
                    borderRadius: "0",
                    px: 1,
                    pt: 1,
                    backgroundColor: "#DDE6ED",
                    color: "#27374D"
                }}
            >
                <Box pt={3} pb={3} px={3}>
                    <Typography
                        variant="h4"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                        sx={{ fontWeight: 'bold', width: "100%" }}
                    >
                        Edit Studio
                    </Typography>
                    <ntg-textbox
                        label="Studio Name"
                        type="text"
                        style={{ marginTop: "1.5rem" }}
                        value={inputName}
                        onInput={onNameChange}
                        onBlur={onBlurNameHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validName && "Please enter studio name"}
                    </Typography>
                    <ntg-textbox
                        label="Studio Code"
                        type="text"
                        style={{ marginTop: "1.5rem" }}
                        value={inputCode}
                        onBlur={onBlurCodeHandler}
                        onInput={onCodeChange}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validCode && "Please enter studio Code"}
                    </Typography>
                    <ntg-textbox
                        label="Studio Email"
                        type="text"
                        style={{ marginTop: "1.5rem" }}
                        value={inputEmail}
                        onBlur={onBlurEmailHandler}
                        onInput={onEmailChange}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validEmail && "Please enter studio email"}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {!correctEmail && "Please enter valid studio email"}
                    </Typography>
                    {/* <TextField
                        id="status"
                        label="Status"
                        type="text"
                        fullWidth
                        sx={{ mt: "1.5rem" }}
                        value={inputStatus}
                        onBlur={onBlurStatusHandler}
                        onChange={onStatusChange}
                        textTransform='capitalize'
                        InputProps={{
                            readOnly: true,
                          }}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validStatus && "Please enter Status"}
                    </Typography> */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 3 }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputCode || !inputEmail  || validEmail || !correctEmail }
                            sx={{
                                backgroundImage: "linear-gradient(316deg, #310e68 0%, #4a0d55 20%, #5f0f40 80%)",
                              }}
                        >
                            Submit
                        </Button>
                        <nash-button transform='uppercase' type="raised" color="#F5F6F8" onClick={handleEditClose}>Cancel</nash-button>
                    </Stack>
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to edit this?"} open={open} onConfirmAction={confirmEditActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default EditDialog
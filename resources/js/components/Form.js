import React, { useEffect, useRef, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Assignment } from '@material-ui/icons';
import { useForm } from "react-hook-form";
import lead from "../services/lead";
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Fab from "@material-ui/core/Fab";
import PublishIcon from '@material-ui/icons/Publish';
import { yupResolver } from '@hookform/resolvers';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let leadSchema = yup.object().shape({
    name: yup.string().max(190).required(),
    email: yup.string().email().max(250).required(),
    phone: yup.string().required(),
    message: yup.string().max(250),
    file: yup.mixed()
});

export default function Form() {
    const classes = useStyles();
    const {
        handleSubmit,
        register,
        reset,
        errors,
        setError,
        setValue
    } = useForm({resolver: yupResolver(leadSchema)})
    const [ openAlert, setOpenAlert ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState()
    const [ alertColor, setAlertColor ] = useState()
    const [ file, setFile ] = useState()

    const clearForm = () => {
        reset()
        setValue("phone",'')
        setFile(null)
    }

    const successForm = () => {
        setAlertMessage("Cadastro efetuado com sucesso")
        setAlertColor("success")
    }

    const errorForm = () => {
        setAlertMessage("Ops. Algo não está correto ainda")
        setAlertColor("error")
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway'  ) {
            return
        }
        setOpenAlert(false)
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleErrors = dataErrors => {
        Object.keys(dataErrors).map(errorName => ({
            type: "manual",
            name: errorName,
            message: dataErrors[errorName].join(" ")
        })).forEach(({ name, type, message }) =>
            setError(name, { type, message })
        );
    }

    const handleFormValues = values => {
        const data  = new FormData();
        Object.keys(values).map( i => data.append(i, values[i]))
        if (file) {
            data.append("file", file)
        }
        return data
    }

    const onSubmit = (values) => {
        lead.send(handleFormValues(values))
            .then(response => {
                setOpenAlert(true)
                if (response.success) {
                    successForm()
                    clearForm()
                    return;
                }
                handleErrors(response.error.errors)
                errorForm()
            })
            .catch(() => errorForm())
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={alertColor}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                    <Avatar className={classes.avatar}>
                        <Assignment/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Faça seu cadastro aqui.
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            inputRef={register}
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={register}
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                        />
                        <InputMask
                            mask="(99) 99999-9999"
                            disabled={false}
                            maskChar=" "
                        >
                            {() => <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Telefone"
                                name="phone"
                                autoComplete="phone"
                                autoFocus
                                inputRef={register}
                                error={!!errors.phone}
                                helperText={errors.phone && errors.phone.message}
                            />}
                        </InputMask>

                        <TextField
                            variant="outlined"
                            label="Mensagem"
                            name="message"
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                            defaultValue=""
                            inputRef={register}
                            error={!!errors.message}
                            helperText={errors.message && errors.message.message}
                        />
                        <label htmlFor="file">
                            <input
                                style={{display: 'none'}}
                                id="file"
                                type="file"
                                name="file"
                                onChange={e => handleFileChange(e)}
                            />
                            <Button color="inherit" variant="contained" component="span">
                                <PublishIcon />
                                Carregar arquivo
                            </Button>{" "}
                            <Typography variant="overline">{file ? file.name : ""}</Typography>
                        </label>
                        <Grid>
                            <Typography variant="caption" color="error">{errors.file ? errors.file.message : ""}</Typography>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

import React from "react";
import { useState } from "react"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../css/pages/home.css"

export const Input = React.memo(({type, label, rules, options, checkError})=>{
    
    const [inputvalue, changeInputValue] = useState(type === "date" ? new Date() : "");
    const [inputError, setInputError] = useState({error: false, message: " "})
    
    function handleInput(change, value, setError, rules, type){
        if (type !== "number") {
            change(value)
        }else{
            change(value)
        }
        let error = false
        if (rules === "text") {
            if (value.length > 0 && value.length < 3) {
                setError({error: true, message: "Must have more than 2 letters"})
                error = true
            }
            if(value.match(/[^A-Za-zÀ-ÿ-]/)){
                setError({error: true, message: "Must only include letters"})
                error = true
            }
            if(error === false){
                setError({error: false, message: " "})
            }
        }

        if (rules === "birthdate") {
            if(value > new Date()){
                setError({error: true, message: "Negative birth date"})
                error = true
            }else{
                setError({error: false, message: " "})
            }
        }
        
        if (rules === "address") {
            if(value.match(/[^A-Za-zÀ-ÿ- ]/)){
                setError({error: true, message: "Bad character"})
                error = true
            }else{
                setError({error: false, message: " "})
            }
        }

        if (error && checkError !== undefined) {
            checkError(true)
        }
        if(!error && checkError !== undefined){
            checkError(false)
        }
    }
    
    function getComponent(){
        if (type === "text" || type === "number") {
            return(
                <TextField 
                    label={label}
                    variant="standard"
                    InputProps={{ inputProps: type === "number" ? { inputMode: 'numeric', pattern: "[0-9]{5}" } : {} }}
                    required
                    error={inputError.error}
                    helperText={inputError.message}
                    value={inputvalue}
                    onChange={(e) => handleInput(changeInputValue, e.target.value, setInputError, rules, type)}
                />
                )
            }
        if (type === "date") {
            return(
                <DatePicker
                    label={label}
                    value={inputvalue}
                    onChange={(e) => {
                        handleInput(changeInputValue, e, setInputError, rules)
                    }}
                    renderInput={(params) => <TextField 
                        {...params} 
                        error={inputError.error}
                        helperText={inputError.message}
                        required
                    />}
                />
            )
        }
        if (type === "complete") {
            return(
                <Autocomplete
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField 
                        {...params}
                        label={label}
                        required
                        error={inputError.error}
                        helperText={inputError.message}
                        value={inputvalue}
                        onChange={(e) => {
                            handleInput(changeInputValue, e.target.value, setInputError)
                        }}
                        />
                    }
                />
            )
        }
    }

    return(
        getComponent()
    )
})
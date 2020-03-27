import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
    name: yup   
            .string()
            .required("must give name")
            .min(2, "name must be more than 2 characters"),
    size: yup
            .string()
            .required("must choose size"),
    sauce: yup
            .string()
            .required("must choose sauce"),
    toppings: yup
            .boolean()
            .oneOf([])
            .required(),
    special: yup   
            .string()
});

const Form = () => {
    return (
        null
    )};

export default Form;


import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
    name: yup.string().required("must give name").min(2, "name must be more than 2 characters"),
    // size: yup.string().required("must choose size"),
    // sauce: yup.string().required("must choose sauce"),
    // toppings: yup.boolean(),
    // special: yup.string(),
    // terms: yup.boolean().oneOf([true], "must accept the terms").required("must choose atleast one toppings")
});

const Form = () => {
//form state
const [formState, setFormState] = useState({
    name: "",
    size: "", 
    sauce: "", 
    toppings: "", 
    special: "", 
    terms: ""
});
//errors state
const [errors, setErrors] = useState({
    name: "",
    size: "", 
    sauce: "", 
    toppings: "", 
    special: "", 
    terms: ""
});
//post state
const [post, setPost] = useState([]);
//button state
const [button, setButton] = useState(true);

//setup validation
useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButton(!valid);
    });
}, [formState]);
//setup event handler
const inputChange = e => {
    e.persist();
    const newFormData = {
        ...formState, 
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
};
//setting up final validation
const validateChange = e => {
    yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
        .then(valid => {
            setErrors({
                ...errors, 
                [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });
};
//setup post request
const formSubmit = e => {
    e.preventDefault();
    axios
        .post("https://reqres.in/api/orders/", formState)
        .then(res => {
            setPost(res.data);
            setFormState({
                 name: "",
                size: "", 
                sauce: "", 
                toppings: "", 
                special: "", 
                terms: ""
            });
        })
        .catch(err => console.log("error when subbmitting", err.response));
};

    return (
        <form onSubmit={formSubmit}>
            <Link to={"/"}>
                <div>Home</div>
            </Link>
            <label htmlFor="name">
                What's the name for the order?
                <input 
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
            </label>
            <br />
            <label htmlFor="size">
                Select the right size for you!
                <select
                    id="size"
                    name="size"
                    onChange={inputChange}>
                        <option name="small" value="small">Small</option>
                        <option name="medium" value="medium">Medium</option>
                        <option name="large" value="large">Large</option>
                        <option name="xLarge" value="xLarge">X-Large</option>
                    </select>
                    {errors.name.length > 0 ? (<p className="error">{errors.size}</p>) : null}
            </label>
            <br />
            <label htmlFor="sauce">
                Select your favorite sauce!
                <select
                    id="sauce"
                    name="sauce"
                    onChange={inputChange}>
                        <option name="original" value="original">Original</option>
                        <option name="garlicRanch" value="garlicRanch">Garlic Ranch</option>
                        <option name="bbq" value="bbq">BBQ</option>
                        <option name="alfredo" value="alfredo">Alfredo</option>
                </select>
                {errors.name.length > 0 ? (<p className="error">{errors.sauce}</p>) : null}
            </label>
            <br />
            
            <br />
            <label htmlFor="special">
                Do you have any special requests?
                <textarea 
                    id="special"
                    name="special"
                    value={formState.special}
                    onChange={inputChange}
                />
            </label>
            <br />
            <fieldset className="fieldset">
                <legend>Toppings</legend>
    
                    <p>Choose your favorite toppings!</p>
                    
                    <p>
                        <label><input type="checkbox" name="toppings[]" value="pepperoni" /> Pepperoni</label>
                        <label><input type="checkbox" name="toppings[]" value="chicken" /> Chicken</label>
                        <label><input type="checkbox" name="toppings[]" value="sausage" /> Sausage</label>
                        <label><input type="checkbox" name="toppings[]" value="Bacon" /> Bacon</label>
                        <label><input type="checkbox" name="toppings[]" value="Ham" /> Ham</label>
                    </p>
                    <p>
                        <label><input type="checkbox" name="toppings[]" value="Cheese" />Cheese</label>
                        <label><input type="checkbox" name="toppings[]" value="Onion" />Onion</label>
                        <label><input type="checkbox" name="toppings[]" value="Mushroom" />Mushroom</label>
                        <label><input type="checkbox" name="toppings[]" value="Pineapple" />Pineapple</label>
                        <label><input type="checkbox" name="toppings[]" value="Jalepeno" />Jalepeno</label>
                    </p>
            </fieldset>
            < br/>
            <label htmlFor="terms">
                Review your order and check this box to be able to submit! 
                <input 
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                {errors.terms.length > 0 ? (<p className="error">{errors.terms}</p>) : null}
            </label>
            < br/>
            <pre>{JSON.stringify(post, null, 3)}</pre>
            < br/>
            <button disabled={button}>Add to Order</button>
        </form>
    )};

export default Form;


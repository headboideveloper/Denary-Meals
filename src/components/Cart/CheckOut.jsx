import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
        <form onSubmit={confirmHandler} className='text-left overflow-y-scroll space-y-2 '>
            <div>
            <label htmlFor='name' className='pr-3 font-semibold'>Your Name</label>
           <p> <input className='border border-black rounded-lg ' id='name' ref={nameInputRef} /></p>
            {!formInputsValidity.name && <p className='mt-2 text-red-700'>Please enter a valid name! </p>}
            </div>
            <div>
            <label htmlFor='street' className='pr-3 font-semibold'>Your Street</label>
           <p> <input className='border border-black rounded-lg ' id='street' ref={streetInputRef} type="text" /></p>
            {!formInputsValidity.street && <p className='mt-2 text-red-700'>Please enter a valid street! </p>}
            </div>
            <div>
            <label htmlFor='city' className='pr-3 font-semibold'>Your City</label>
            <p><input className='border border-black rounded-lg ' id='city' ref={cityInputRef} type="text" /></p>
            {!formInputsValidity.city && <p className='mt-2 text-red-700'>Please enter a valid city!</p>}
            </div>
            <div>
            <label htmlFor='postal' className='pr-1 font-semibold'>Your Postal Code</label>
           <p> <input className='border border-black rounded-lg ' id='postal' ref={postalCodeInputRef}/></p>
            {!formInputsValidity.postalCode && <p className='mt-2 text-red-700'>Please enter a valid postal code- 5 characters long! </p>}
            </div>
            <div className='text-right flex-row space-x-3'>
            <button type='button' onClick={props.onCancel} className='border border-black rounded-md p-2'>Cancel</button>
            <button className='bg-[#8a2b06] rounded-md p-2'>Confirm</button>
            </div>
        </form>
  )
}

export default Checkout
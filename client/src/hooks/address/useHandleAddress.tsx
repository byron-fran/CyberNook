import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createAddressThunk, deleteAddressThunk, getAddressThunk, updateAddressThunk } from "../../redux/thunks/AddressThunk";
import { Address } from "../../interface/Address";

const useHandleAddress = (setValue: Function, handleSubmit: Function) => {

    const [disabledStreet, setDisableStreet] = useState<boolean>(true);
    const [disableCodePostal, setDisableCodePostal] = useState<boolean>(true);
    const [disableCountry, setDisableCountry] = useState<boolean>(true);
    const [disabledCity, setDisableCity] = useState<boolean>(true);
    const [disableInteriorNumber, setDisableInteriorNumber] = useState<boolean>(true);

    const [showAlert, setShowAlert] = useState<boolean>(false)
    const { address } = useAppSelector(state => state.address);
    const existAddress = Object.values(address).find(field => field !== "");

    const dispatch = useAppDispatch();

    useEffect(() => {

        if (existAddress) {
            setValue('city', address.city);
            setValue('country', address.country);
            setValue('exteriorNumber', address.exteriorNumber);
            setValue('postalCode', address.postalCode);
            setValue('street', address.street);
            dispatch(getAddressThunk())
        }

    }, [existAddress]);

    const onSubmit = handleSubmit((data: Address) => {
        if (existAddress) {
            dispatch(updateAddressThunk({ id: address?.id, address: data }))
                .then(() => {
                    setShowAlert(true);
                    setDisableStreet(true)
                    setDisableCodePostal(true)
                    setDisableCountry(true)
                    setDisableCity(true)
                    setDisableInteriorNumber(true)
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error);
                    setShowAlert(false)
                })
        }
        else {
            dispatch(createAddressThunk({ address: data }))
                .then(() => {
                    setShowAlert(true);
                    setDisableStreet(true)
                    setDisableCodePostal(true)
                    setDisableCountry(true)
                    setDisableCity(true)
                    setDisableInteriorNumber(true)
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000)
                })
        }
    });

    const handleDeleteAddress = (id: string) => {
        if (confirm(' Are you sure you want to delete this address ?')) {
            dispatch(deleteAddressThunk(id))
            return
        }

    };

    return {
        handleDeleteAddress,
        onSubmit,
        showAlert,
        disabledStreet,
        disableCodePostal,
        disableCountry,
        disabledCity,
        disableInteriorNumber,
        setDisableStreet,
        setDisableCodePostal,
        setDisableCountry,
        setDisableCity,
        setDisableInteriorNumber,
        existAddress
    }
};

export default useHandleAddress
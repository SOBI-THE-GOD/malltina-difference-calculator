import { useMemo, useState } from "react";
import { FormBox } from "../components/FormBox";
import { useAlert } from "../hooks/useAlert";
import { DataInput } from "../components/DataInput";
import { DifferencePholder } from "../components/DifferencePholder";
import Alert from "../components/Alert";
import { LittleContainer } from "../components/LittleContainer";
import { Btn } from "../components/Btn";
import { copyToNavigator } from "../helpers/copyToNavigator";
import { convertDifferenceToNum } from "../helpers/converDifferenceToNum";
import { FullModal } from "../components/FullModal";

const calculateUSDIFF = ({ lastWeight, newWeight, cPrice, express }) => {
    let formulaParam;
    if (0 < newWeight && newWeight <= 1000) {
        formulaParam = 37;
    } else if (1000 < newWeight && newWeight <= 2000) {
        formulaParam = 35;
    } else if (2000 < newWeight && newWeight <= 4000) {
        formulaParam = 34;
    } else if (4000 < newWeight && newWeight <= 8000) {
        formulaParam = 33;
    } else if (8000 < newWeight && newWeight <= 10000) {
        formulaParam = 31;
    } else {
        formulaParam = 0;
    }
    return (
        ((newWeight - lastWeight) / 1000) *
        formulaParam *
        cPrice *
        (express ? 1 : 0.8)
    ).toLocaleString("en-US", { maximumFractionDigits: 0 });
};

const UnitedState = () => {
    const [lastWeight, setLastWeight] = useState(0);
    const [newWeight, setNewWeight] = useState(0);
    const [cPrice, setCPrice] = useState(0);
    const [express, setExpress] = useState(true);
    const [orderID, setOrderID] = useState(0);
    const [userName, setUserName] = useState("");
    const [modal, setModal] = useState(false);
    const difference = useMemo(() => {
        return calculateUSDIFF({
            lastWeight,
            newWeight,
            cPrice,
            express,
        });
    }, [lastWeight, newWeight, cPrice, express]);
    const { alert, showAlert, terminateAlert } = useAlert();
    const inputs = [
        {
            placeHolder: "last weight",
            setState: setLastWeight,
            state: lastWeight,
        },
        {
            placeHolder: "new weight",
            setState: setNewWeight,
            state: newWeight,
        },
        {
            placeHolder: "currency price",
            setState: setCPrice,
            state: cPrice,
        },
    ];
    const modalInputs = [
        {
            placeHolder: "user name",
            setState: setUserName,
            state: userName,
            type: "String",
        },
        {
            placeHolder: "order ID",
            setState: setOrderID,
            state: orderID,
            focusOnRender: true,
        },
    ];
    const changeExpress = () => {
        setExpress((prev) => (prev === true ? false : true));
    };
    const makeNote = (e) => {
        e.preventDefault();
        if (convertDifferenceToNum(difference)) {
            copyToNavigator(
                `جرم نهایی کالا  »  ${newWeight} گرم
                مابه تفاوت وزنی به مبلغ ${difference} تومان پرداخت گردد`,
                "note",
                showAlert
            );
        } else {
            const alertMessage = "information is not complete!";
            showAlert(alertMessage, "Err");
        }
    };
    const openPopup = () => {
        if (convertDifferenceToNum(difference)) {
            setModal(true);
        } else {
            const alertMessage = "information is not complete!";
            showAlert(alertMessage, "Err");
        }
    };
    const makeTicket = (e) => {
        console.log(userName);
        e.preventDefault();
        copyToNavigator(
            `درود بر شما
    ${userName || "مشتری"} عزیز
    سفارش شما با کد  ${orderID} ، به انبار ایران رسیده و وزن گیری شده است . با توجه به اینکه وزن نهایی کالای شما ${newWeight} گرم می باشد مبلغ ${difference} تومان مابه التفاوت وزنی به سفارش شما تعلق گرفته است .
    لطفا پس از پرداخت اطلاع دهید تا کالا خدمتتان ارسال گردد.
    با سپاس`,
            "ticket",
            showAlert
        );
        setModal(false);
    };
    const buttons = [
        { name: "note", onClickAction: null, type: "submit" },
        { name: "ticket", onClickAction: openPopup, type: "button" },
    ];
    ////////////////////////////////////////////////////////////
    return (
        <>
            <Alert alert={alert} terminateAlert={terminateAlert} />
            {modal && (
                <FullModal onSubmitAction={makeTicket}>
                    {modalInputs.map(
                        (
                            {
                                state,
                                setState,
                                placeHolder,
                                focusOnRender,
                                type = null,
                            },
                            key
                        ) => (
                            <DataInput
                                placeHolder={placeHolder}
                                state={state}
                                setState={setState}
                                focusOnRender={focusOnRender && true}
                                showAlert={showAlert}
                                key={key}
                                type={type}
                            />
                        )
                    )}
                    <Btn type="submit">enter</Btn>
                </FullModal>
            )}
            {!modal && (
                <FormBox title="united state" onSubmitAction={makeNote}>
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        {inputs.map(({ state, placeHolder, setState }, key) => {
                            return (
                                <DataInput
                                    showAlert={showAlert}
                                    placeHolder={placeHolder}
                                    state={state}
                                    setState={setState}
                                    key={key}
                                    focusOnRender={key === 0}
                                    containerClass="flex-auto"
                                />
                            );
                        })}
                        <div className="flex items-center justify-around flex-auto">
                            <label className="font-semibold text-lg capitalize">
                                express delievery :
                            </label>
                            <input
                                type="checkbox"
                                name="express delievery"
                                defaultChecked
                                className="accent-black h-4 w-4"
                                onChange={changeExpress}
                            />
                        </div>
                    </div>
                    <DifferencePholder difference={difference} />
                    <LittleContainer>
                        {buttons.map(({ name, onClickAction, type }, key) => {
                            return (
                                <Btn
                                    onClickAction={onClickAction}
                                    key={key}
                                    type={type}
                                >
                                    {name}
                                </Btn>
                            );
                        })}
                    </LittleContainer>
                </FormBox>
            )}
        </>
    );
};

export default UnitedState;

import { useState } from "react";
import { FormBox } from "../components/FormBox";
import { DataInput } from "../components/DataInput";
import { LittleContainer } from "../components/LittleContainer";
import { Btn } from "../components/Btn";
import { WrapBox } from "../components/WrapBox";
import { DifferencePholder } from "../components/DifferencePholder";
import { useAlert } from "../hooks/useAlert";
import { FullModal } from "../components/FullModal";
import Alert from "../components/Alert";
import { copyToNavigator } from "../helpers/copyToNavigator";
import { useMemo } from "react";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { makeRequest } from "../helpers/asiaAPIReq";
import { separateNum } from "../helpers/separateNum";
import BluryText from "../components/BluryText";

const AsiaPage = ({ title, country, currency }) => {
    const [bypassCors, setBypassCors] = useState(false);
    const [lastWeight, setLastWeight] = useState(0);
    const [newWeight, setNewWeight] = useState(0);
    const [price, setPrice] = useState(0);
    const [orderID, setOrderID] = useState(null);
    const [userName, setUserName] = useState("");
    const [modal, setModal] = useState(false);
    const { alert, showAlert, terminateAlert } = useAlert();
    const inputsRefArr = [lastWeight, newWeight, price];
    const requestArray = useMemo(() => {
        return [
            [country, `${price}`, lastWeight > 150 ? lastWeight : 150],
            [country, `${price}`, newWeight],
        ];
    }, inputsRefArr);
    const reqSign = useMemo(
        () => Math.floor(Math.random() * 9999999),
        inputsRefArr
    );
    const isInfoReady = useMemo(() => {
        const depMultiply = lastWeight * newWeight * price;
        return depMultiply > 0 && newWeight > lastWeight;
    }, inputsRefArr);
    const [pending, setPending] = useState(false);
    const [difference, setDifference] = useState(null);
    const separatedDiff = useMemo(() => {
        return separateNum(difference);
    }, [difference]);
    useEffect(() => {
        const handleExtensionStatus = (event) => {
            if (event.data.type === "EXTENSION_STATUS") {
                setBypassCors(event.data.bypassCors);
            }
        };
        if (document.getElementById("__cors_extension_marker")) {
            setBypassCors(true);
        }
        window.addEventListener("message", handleExtensionStatus);

        const responseListener = ({
            data,
            data: { type, fulfilled, payload = {}, message = "" },
        }) => {
            if (type !== "from_extension") return;
            if (data.reqSign !== reqSign) {
                setDifference(null);
                setPending(false);
            } else if (fulfilled) {
                let [{ amount: lastPrice }, { amount: newPrice }] = payload;
                lastPrice = String(lastPrice).slice(0, -1);
                newPrice = String(newPrice).slice(0, -1);
                console.log(lastPrice);
                console.log(newPrice);
                setDifference((newPrice - lastPrice).toFixed(0));
                setPending(false);
            } else {
                if (message === "AbortError") return;
                console.log(message);
            }
        };
        window.addEventListener("message", responseListener);
        if (isInfoReady) {
            setPending(true);
            setDifference(null);
            sendReq(makeRequest(requestArray));
        } else {
            setPending(false);
        }
        return () => {
            window.removeEventListener("message", responseListener);
            window.removeEventListener("message", handleExtensionStatus);
        };
    }, [isInfoReady, ...inputsRefArr]);
    const sendReq = (req) => {
        window.postMessage(
            {
                reqSign,
                type: "from_web_app",
                payload: req,
            },
            window.location.origin
        );
    };
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
            placeHolder: `price ( ${currency} )`,
            setState: setPrice,
            state: price,
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
            type: "String",
        },
    ];
    const makeNote = (e) => {
        e.preventDefault();
        if (!pending && isInfoReady) {
            copyToNavigator(
                `جرم نهایی کالا  »  ${newWeight} گرم
                مابه تفاوت وزنی به مبلغ ${separatedDiff} تومان پرداخت گردد`,
                "note",
                showAlert
            );
        } else {
            const alertMessage = pending
                ? "wait your request is in progress!"
                : "information is not complete!";
            showAlert(alertMessage, "Err");
        }
    };
    const makeTicket = (e) => {
        e.preventDefault();
        copyToNavigator(
            `درود بر شما
    ${userName || "مشتری"} عزیز
    سفارش شما با کد  ${
        orderID || "---"
    } ، به انبار ایران رسیده و وزن گیری شده است . با توجه به اینکه وزن نهایی کالای شما ${newWeight} گرم می باشد مبلغ ${separatedDiff} تومان مابه التفاوت وزنی به سفارش شما تعلق گرفته است .
    لطفا پس از پرداخت اطلاع دهید تا کالا خدمتتان ارسال گردد.
    با سپاس`,
            "ticket",
            showAlert
        );
        setModal(false);
    };
    const openPopup = () => {
        if (!pending && isInfoReady) {
            setModal(true);
        } else {
            const alertMessage = pending
                ? "wait your request is in progress!"
                : "information is not complete!";
            showAlert(alertMessage, "Err");
        }
    };
    const buttons = [
        { name: "note", onClickAction: null, type: "submit" },
        { name: "ticket", onClickAction: openPopup, type: "button" },
    ];

    return (
        <>
            {bypassCors ? (
                <div>
                    <Alert alert={alert} terminateAlert={terminateAlert} />
                    {modal && (
                        <FullModal onSubmitAction={makeTicket}>
                            {modalInputs.map(
                                (
                                    {
                                        placeHolder,
                                        state,
                                        setState,
                                        type,
                                        focusOnRender = null,
                                    },
                                    key
                                ) => {
                                    return (
                                        <DataInput
                                            showAlert={showAlert}
                                            placeHolder={placeHolder}
                                            state={state}
                                            setState={setState}
                                            type={type}
                                            focusOnRender={
                                                focusOnRender && true
                                            }
                                            key={key}
                                        />
                                    );
                                }
                            )}
                            <Btn type="submit">enter</Btn>
                        </FullModal>
                    )}
                    {!modal && (
                        <FormBox title={title} onSubmitAction={makeNote}>
                            <WrapBox>
                                {inputs.map(
                                    ({ placeHolder, setState, state }, key) => {
                                        return (
                                            <DataInput
                                                placeHolder={placeHolder}
                                                state={state}
                                                setState={setState}
                                                key={key}
                                                focusOnRender={key === 0}
                                                type="Number"
                                            />
                                        );
                                    }
                                )}
                            </WrapBox>

                            <DifferencePholder difference={difference}>
                                <Loading animate={pending} />
                            </DifferencePholder>

                            <LittleContainer>
                                {buttons.map(
                                    ({ name, onClickAction, type }, key) => {
                                        return (
                                            <Btn
                                                onClickAction={onClickAction}
                                                type={type}
                                                key={key}
                                                btnClass={
                                                    pending
                                                        ? "active:scale-100 hover:scale-100 text-neutral-400"
                                                        : ""
                                                }
                                            >
                                                {name}
                                            </Btn>
                                        );
                                    }
                                )}
                            </LittleContainer>
                        </FormBox>
                    )}
                </div>
            ) : (
                <BluryText
                    text="install bypassCors extension !"
                    direction="bottom"
                    animateBy="letter"
                    delay={20}
                    className="text-1xl sm:text-2xl md:text-3xl xl:text-5xl w-max font-extrabold mb-8 text-tertiary text-center apitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            )}
        </>
    );
};

export default AsiaPage;

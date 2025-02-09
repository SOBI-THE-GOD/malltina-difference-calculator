import { useMemo, useState } from "react";
import Alert from "../components/Alert";
import { useAlert } from "../hooks/useAlert";
import { DataInput } from "../components/DataInput";
import { FullModal } from "../components/FullModal";
import { FormBox } from "../components/FormBox";
import { copyToNavigator } from "../helpers/copyToNavigator";
import { Btn } from "../components/Btn";
import { LittleContainer } from "../components/LittleContainer";
import { DifferencePholder } from "../components/DifferencePholder";
import { convertDifferenceToNum } from "../helpers/converDifferenceToNum";

function Ranjbar() {
    const [weight, setWeight] = new useState(0);
    const [cPrice, setCPrice] = new useState(0);
    const { alert, showAlert, terminateAlert } = useAlert(2500);
    const [orderID, setOrderID] = new useState(0);
    const [modal, setModal] = new useState(false);
    const difference = useMemo(() => {
        return calcRanjbarDiff(weight, cPrice);
    }, [weight, cPrice]);
    const dataInputs = [
        {
            placeHolder: "final weight",
            setState: setWeight,
            state: weight,
            focusOnRender: true,
        },
        {
            placeHolder: "currency price",
            setState: setCPrice,
            state: cPrice,
        },
    ];
    const makeNote = (e) => {
        e.preventDefault();
        if (convertDifferenceToNum(difference)) {
            copyToNavigator(
                `جرم نهایی کالا  »  ${weight} گرم
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
        e.preventDefault();
        copyToNavigator(
            `درود بر شما
جواد رنجبر عزیز
سفارش شما با کد  ${orderID} ، به انبار ایران رسیده و وزن گیری شده است . با توجه به اینکه وزن نهایی کالای شما ${weight} گرم می باشد مبلغ ${difference} تومان مابه التفاوت وزنی به سفارش شما تعلق گرفته است .
لطفا پس از پرداخت اطلاع دهید تا کالا خدمتتان ارسال گردد.
با سپاس`,
            "ticket",
            showAlert
        );
        setModal(false);
    };
    const buttonNames = [
        { name: "note", onClickAction: null, type: "submit" },
        { name: "ticket", onClickAction: openPopup, type: "button" },
    ];
    ///////////////////////////////////////////////////////
    return (
        <>
            <Alert alert={alert} terminateAlert={terminateAlert} />
            {modal && (
                <FullModal onSubmitAction={makeTicket}>
                    <DataInput
                        placeHolder="order id"
                        setState={setOrderID}
                        showAlert={showAlert}
                        state={orderID}
                        focusOnRender={true}
                    />
                    <Btn>enter</Btn>
                </FullModal>
            )}
            {!modal && (
                <FormBox title="ranjbar difference" onSubmitAction={makeNote}>
                    {dataInputs.map((input, key) => {
                        return (
                            <DataInput
                                placeHolder={input.placeHolder}
                                setState={input.setState}
                                state={input.state}
                                showAlert={showAlert}
                                key={key}
                                focusOnRender={input?.focusOnRender && true}
                            />
                        );
                    })}
                    <DifferencePholder difference={difference} />
                    <LittleContainer>
                        {buttonNames.map(
                            ({ name, onClickAction, type }, key) => {
                                return (
                                    <Btn
                                        onClickAction={onClickAction}
                                        key={key}
                                        type={type}
                                    >
                                        {name}
                                    </Btn>
                                );
                            }
                        )}
                    </LittleContainer>
                </FormBox>
            )}
        </>
    );
}

function calcRanjbarDiff(weight, cPrice) {
    const calcCeofficient = (weight) => {
        if (weight < 1000) {
            return 11;
        } else if (weight >= 1000 && weight < 5000) {
            return 10;
        } else if (weight >= 5000) {
            return 9;
        } else {
            return 0;
        }
    };
    const ceofficient = calcCeofficient(weight);
    return (
        ((weight / 1000) * (ceofficient + 2) + 1) * cPrice +
        46000 -
        ((0.15 * (ceofficient + 2) + 1) * cPrice + 46000)
    ).toLocaleString("en-US", { maximumFractionDigits: 0 });
}
export default Ranjbar;

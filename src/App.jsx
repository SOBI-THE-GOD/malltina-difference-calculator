import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./App.css";
import clipLogo from "../src/clip-logo.svg";

function App() {
    let timeoutIDs = {
        alert: null,
    };
    const [weight, setWeight] = new useState(0);
    const [cPrice, setCPrice] = new useState(0);
    return (
        <>
            <OverallCont
                timeoutIDs={timeoutIDs}
                weight={weight}
                setWeight={setWeight}
                cPrice={cPrice}
                setCPrice={setCPrice}
            />
        </>
    );
}
function OverallCont({ timeoutIDs, weight, setWeight, cPrice, setCPrice }) {
    const [alertBody, setAlertBody] = new useState({
        type: "--",
        message: "something went wrong !",
        show: false,
    });
    const [orderID, setOrderID] = new useState(0);
    const dataInputs = [
        { placeHolder: "final weight", setState: [setWeight] },
        { placeHolder: "currency price", setState: [setCPrice] },
    ];
    const buttonNames = ["note", "ticket"];
    const [popup, setPopup] = new useState(false);
    return (
        <>
            <Alert alertBody={alertBody} />
            {popup && (
                <Popup
                    weight={weight}
                    orderID={orderID}
                    cPrice={cPrice}
                    setAlertBody={setAlertBody}
                    setPopup={setPopup}
                    timeoutIDs={timeoutIDs}
                >
                    <DataInput
                        name="order id"
                        setState={setOrderID}
                        orderID={orderID}
                        setAlertBody={setAlertBody}
                        timeoutIDs={timeoutIDs}
                    />
                    <Btn name="enter" />
                </Popup>
            )}
            {!popup && (
                <MainCont>
                    {dataInputs.map((input, key) => {
                        return (
                            <DataInput
                                name={input.placeHolder}
                                setState={input.setState[0]}
                                weight={weight}
                                cPrice={cPrice}
                                setAlertBody={setAlertBody}
                                key={key}
                                timeoutIDs={timeoutIDs}
                            />
                        );
                    })}
                    <BtnCont>
                        {buttonNames.map((name, key) => {
                            return (
                                <Btn
                                    name={name}
                                    weight={weight}
                                    cPrice={cPrice}
                                    setAlertBody={setAlertBody}
                                    setPopup={setPopup}
                                    timeoutIDs={timeoutIDs}
                                    key={key}
                                />
                            );
                        })}
                    </BtnCont>
                </MainCont>
            )}
        </>
    );
}

function Popup({
    children,
    orderID,
    weight,
    cPrice,
    setAlertBody,
    setPopup,
    timeoutIDs,
}) {
    const makeTicket = (cPrice, weight, orderID) => {
        copyToNavigator(
            `درود بر شما
جوا رنجبر عزیز
سفارش شما با کد  ${orderID} ، به انبار ایران رسیده و وزن گیری شده است . با توجه به اینکه وزن نهایی کالای شما ${weight} گرم می باشد مبلغ ${calcRanjbarDiff(
                weight,
                cPrice
            )} تومان مابه التفاوت وزنی به سفارش شما تعلق گرفته است .
لطفا پس از پرداخت اطلاع دهید تا کالا خدمتتان ارسال گردد.
با سپاس`,
            "ticket",
            setAlertBody,
            timeoutIDs
        );
    };
    const submitPopupForm = (e) => {
        e.preventDefault();
        makeTicket(cPrice, weight, orderID);
        setPopup(false);
    };

    return (
        <form
            className="w-7/12 absolute top-1/2 left-1/2 p-10 font-sans flex flex-row bg-white max-w-screen-md -translate-y-1/2 -translate-x-1/2 animate-showup gap-5 max-lg:flex-col"
            onSubmit={(e) => {
                submitPopupForm(e);
            }}
        >
            {children}
        </form>
    );
}
function MainCont({ children }) {
    return (
        <section className="w-7/12 border-gray-800 border-1 border-solid rounded-md shadow-xl mx-auto mt-10 p-10 font-sans flex flex-col gap-y-5 max-w-screen-md">
            <h1 className="text-black text-4xl font-bold uppercase text-center mb-9 tracking-wide">
                Ranjbar Difference
            </h1>
            {children}
        </section>
    );
}
function clipBAccessAlert(timeoutIDs, setAlertBody) {
    const alertMessage = "clipboard access required";
    clearTimeout(timeoutIDs.alert);
    setAlertBody({
        message: alertMessage,
        type: "Err",
        show: true,
    });
    timeoutIDs.alert = setTimeout(() => {
        setAlertBody({
            message: alertMessage,
            type: "Err",
            show: false,
        });
    }, 2500);
}
function DataInput({
    name,
    setAlertBody,
    timeoutIDs,
    setState,
    cPrice,
    weight,
    orderID,
}) {
    const inputRef = new useRef(null);
    function handleOnFocus(e) {
        const input = e.target;
        input.nextElementSibling.style.cssText = `
            top: 0;
            scale: 0.9;
            color: #000;
        `;
    }
    function handleOnBlur(e) {
        const input = e.target;
        if (input.value.trim().length == 0) {
            input.nextElementSibling.style.cssText = "";
            input.value = "";
        }
    }
    function paste(e) {
        const pasteIcn = e.target;
        navigator.clipboard.readText().then(
            (res) => {
                const input = pasteIcn.parentElement.querySelector("input");
                input.value = res.trim();
                input.focus();
                setState(Number(input.value));
            },
            () => {
                clipBAccessAlert(timeoutIDs, setAlertBody);
            }
        );
    }
    useEffect(() => {
        const input = inputRef.current;
        if (input.name === "order id") {
            input.focus();
        }
        if (cPrice && input.name === "currency price") {
            input.value = cPrice;
            input.focus();
        } else if (weight && input.name === "final weight") {
            input.value = weight;
            input.focus();
        } else if (orderID && input.name === "order id") {
            input.value = orderID;
            input.focus();
        }
    });
    return (
        <div className="relative">
            <input
                type="text"
                name={name}
                className="outline-none border-solid border-2 border-gray-300 w-full rounded-full shadow-md py-3 px-11"
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                ref={inputRef}
                onChange={(e) => {
                    setState(Number(e.target.value));
                }}
            />
            <span
                className="absolute transition-all top-1/2 left-11 -translate-y-1/2 bg-white text-gray-500 px-2 rounded-full capitalize"
                onClick={(e) => {
                    e.target.previousElementSibling.focus();
                }}
            >
                {name}
            </span>
            <img
                src={clipLogo}
                alt="clipboard logo"
                className="absolute h-6 top-1/2 right-5 -translate-y-1/2 cursor-pointer active:scale-[0.98]"
                onClick={paste}
            />
        </div>
    );
}
function BtnCont({ children }) {
    return (
        <div className="flex space-x-4 items-center justify-evenly mb-1 mt-4">
            {children}
        </div>
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
function copyToNavigator(text, subject = "text", setAlertBody, timeoutIDs) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            const alertMessage = `${subject} copied to your clipboard successfully !`;
            clearTimeout(timeoutIDs.alert);
            setAlertBody({
                message: alertMessage,
                type: "Message",
                show: true,
            });
            timeoutIDs.alert = setTimeout(() => {
                setAlertBody({
                    message: alertMessage,
                    type: "Message",
                    show: false,
                });
            }, 2500);
        })
        .catch(() => {
            clipBAccessAlert(timeoutIDs, setAlertBody);
        });
}

function Btn({ name, cPrice, setAlertBody, timeoutIDs, weight, setPopup }) {
    const makeNote = (cPrice, weight) => {
        copyToNavigator(
            `جرم نهایی کالا  »  ${weight} گرم
مابه تفاوت وزنی به مبلغ ${calcRanjbarDiff(weight, cPrice)} تومان پرداخت گردد`,
            "note",
            setAlertBody,
            timeoutIDs
        );
    };
    const openPopup = () => {
        setPopup(true);
    };

    return (
        <button
            onClick={
                cPrice && weight
                    ? () => {
                          if (name === "note") {
                              makeNote(cPrice, weight);
                          } else if (name === "ticket") {
                              openPopup();
                          }
                      }
                    : () => {
                          const alertMessage = "information is not complete!";
                          clearTimeout(timeoutIDs.alert);
                          setAlertBody({
                              message: alertMessage,
                              type: "Err",
                              show: true,
                          });
                          timeoutIDs.alert = setTimeout(() => {
                              setAlertBody({
                                  message: alertMessage,
                                  type: "Err",
                                  show: false,
                              });
                          }, 2500);
                      }
            }
            className="text-white bg-black rounded-full font-semibold px-3 py-3 flex-1 uppercase tracking-wide transition-all hover:scale-[1.015] active:scale-100"
        >
            {name}
        </button>
    );
}

function Alert({ alertBody: { type, show, message } }) {
    let alertStyles = {
        borderColor: type === "Err" ? "#ef4444" : "#000000",
        color: type === "Err" ? "#ef4444" : "#000000",
    };
    return (
        show && (
            <div
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-full shadow-xl border-2 font-medium text-sm tracking-wide capitalize animate-showup bg-white`}
                style={alertStyles}
            >
                {message}
            </div>
        )
    );
}
export default App;

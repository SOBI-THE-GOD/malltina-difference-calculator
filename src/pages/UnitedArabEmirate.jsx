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

const UnitedArabEmirate = () => {
	const [lastWeight, setLastWeight] = useState(0);
	const [newWeight, setNewWeight] = useState(0);
	const [price, setPrice] = useState(0);
	const [orderId, setOrderId] = useState(null);
	const [userName, setUserName] = useState("");
	const [modal, setModal] = useState(false);
	const { alert, showAlert, terminateAlert } = useAlert();
	const reqSign = useMemo(() => Math.floor(Math.random() * 9999999), []);
	const isInfoReady = useMemo(() => {
		const depMultiply = lastWeight * newWeight * price;
		return depMultiply > 0 && newWeight > lastWeight;
	}, [lastWeight, newWeight, price]);
	const [pending, setPending] = useState(false);
	useEffect(() => {
		if (isInfoReady) {
			setPending(true);
			sendReq("req sent!");
		}
	}, [isInfoReady, pending, lastWeight, newWeight, price]);
	const sendReq = (req) => {
		console.log(req);
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
			placeHolder: "price ( AED )",
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
			stState: setOrderId,
			state: orderId,
			focusOnRender: true,
			type: "String",
		},
	];
	const makeNote = (e) => {
		e.preventDefault();
		if (!pending) {
			copyToNavigator(
				`جرم نهایی کالا  »  ${newWeight} گرم
                مابه تفاوت وزنی به مبلغ ${separatedDiff} تومان پرداخت گردد`,
				"note",
				showAlert,
			);
		} else {
			const alertMessage = "information is not complete!";
			showAlert(alertMessage, "Err");
		}
	};
	const makeTicket = (e) => {
		e.preventDefault();
		copyToNavigator(
			`درود بر شما
    ${userName || "مشتری"} عزیز
    سفارش شما با کد  ${orderId} ، به انبار ایران رسیده و وزن گیری شده است . با توجه به اینکه وزن نهایی کالای شما ${newWeight} گرم می باشد مبلغ ${separatedDiff} تومان مابه التفاوت وزنی به سفارش شما تعلق گرفته است .
    لطفا پس از پرداخت اطلاع دهید تا کالا خدمتتان ارسال گردد.
    با سپاس`,
			"ticket",
			showAlert,
		);
		setModal(false);
	};
	const openPopup = () => {
		if (!pending) {
			setModal(true);
		} else {
			const alertMessage = "information is not complete!";
			showAlert(alertMessage, "Err");
		}
	};
	const buttons = [
		{ name: "note", onClickAction: null, type: "submit" },
		{ name: "ticket", onClickAction: openPopup, type: "button" },
	];

	return (
		<>
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
							key,
						) => {
							return (
								<DataInput
									showAlert={showAlert}
									placeHolder={placeHolder}
									state={state}
									setState={setState}
									type={type}
									focusOnRender={focusOnRender && true}
									key={key}
								/>
							);
						},
					)}
					<Btn type="submit">enter</Btn>
				</FullModal>
			)}
			{!modal && (
				<FormBox title="united arab Emirate" onSubmitAction={makeNote}>
					<WrapBox>
						{inputs.map(({ placeHolder, setState, state }, key) => {
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
						})}
					</WrapBox>

					<DifferencePholder />
					<LittleContainer>
						{buttons.map(({ name, onClickAction, type }, key) => {
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
						})}
					</LittleContainer>
				</FormBox>
			)}
		</>
	);
};

export default UnitedArabEmirate;

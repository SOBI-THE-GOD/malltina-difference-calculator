const $ = document;
const calcBtn = $.querySelector(".calc-btn");
const firstLineResult = $.querySelector(".first-result");
const secondLineResult = $.querySelector(".second-result");
const calcResultContainer = $.querySelector(".calculation-result");
const weightInput = $.querySelector("#weight");
const currencyInput = $.querySelector("#currency");
let coefficient = null;
let newWeight = null;
let currencyPrice = null;
let finalDifference = null;
const calcCeofficient = (newWeight) => {
    if (newWeight < 1000) {
        return 11;
    } else if (newWeight >= 1000 && newWeight < 5000) {
        return 10;
    } else if (newWeight >= 5000) {
        return 9;
    } else {
        return 0;
    }
};

calcResultContainer.onclick = () => {
    navigator.clipboard.writeText(`جرم نهایی کالا  »  ${newWeight} گرم
مابه تفاوت وزنی به مبلغ ${finalDifference} تومان پرداخت گردد`);
};
calcBtn.onclick = () => {
    newWeight = Number(weightInput.value.trim());
    currencyPrice = Number(currencyInput.value.trim());
    coefficient = calcCeofficient(newWeight);
    finalDifference = (
        ((newWeight / 1000) * (coefficient + 2) + 1) * currencyPrice +
        46000 -
        ((0.15 * (coefficient + 2) + 1) * currencyPrice + 46000)
    ).toLocaleString("en-US", { maximumFractionDigits: 0 });
    firstLineResult.innerHTML = `جرم نهایی کالا  »  ${newWeight} گرم`;
    secondLineResult.innerHTML = `مابه تفاوت وزنی به مبلغ ${finalDifference} تومان پرداخت گردد`;
    weightInput.value = "";
    currencyInput.value = "";
};

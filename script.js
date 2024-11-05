const $ = document;
const resetBtn = $.querySelector(".reset-btn");
const firstResult = $.querySelector(".first-result");
const secondResult = $.querySelector(".second-result");
const calcResultContainer = $.querySelector(".calculation-result");

const newWeight = Number(window.prompt("وزن جدید به گرم"));
const dollarPrice = Number(window.prompt("قیمت دلار به تومن"));
const coefficient =
    newWeight < 1000
        ? 11
        : newWeight >= 1000 && newWeight < 5000
        ? 10
        : newWeight >= 5000
        ? 9
        : 0;
console.log(coefficient);
const finalDifference = (
    ((newWeight / 1000) * (coefficient + 2) + 1) * dollarPrice +
    46000 -
    ((0.15 * (coefficient + 2) + 1) * dollarPrice + 46000)
).toLocaleString("en-US", { maximumFractionDigits: 0 });
firstResult.innerHTML = `جرم نهایی کالا  »  ${newWeight} گرم`;
secondResult.innerHTML = `مابه تفاوت وزنی به مبلغ ${finalDifference} تومان پرداخت گردد`;

calcResultContainer.onclick = () => {
    navigator.clipboard.writeText(`جرم نهایی کالا  »  ${newWeight} گرم
مابه تفاوت وزنی به مبلغ ${finalDifference} تومان پرداخت گردد`);
};
resetBtn.onclick = () => {
    window.history.go(0);
};

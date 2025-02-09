export function copyToNavigator(text, subject = "text", showAlert) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                const alertMessage = `${subject} copied to your clipboard successfully !`;
                showAlert && showAlert(alertMessage, "message");
            })
            .catch(() => {
                showAlert && showAlert("clipboard access required !", "Err");
            });
    } else {
        showAlert && showAlert("clipboard access required !", "Err");
    }
}

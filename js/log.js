let logArea = document.getElementById("logArea");

const addLog = (message) => {
    logArea.value = logArea.value + "[INFO] - " + `${message}\n`;
}

const addErrorLog = (errMessage) => {
    logArea.value = logArea.value + "[ERROR] - " + `${errMessage}\n`;
}

const clearLog = () => {
    logArea.value = "";
}


module.exports = {
    addLog: addLog,
    addErrorLog: addErrorLog,
    clearLog: clearLog
}
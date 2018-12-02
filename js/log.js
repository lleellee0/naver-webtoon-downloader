let logArea = document.getElementById("logArea");

const addLog = (message) => {
    logArea.value = "[INFO] - " + logArea.value + `${message}\n`;
}

const addErrorLog = (errMessage) => {
    logArea.value = "[ERROR] - " + logArea.value + `${errMessage}\n`;
}

const clearLog = () => {
    logArea.value = "";
}


module.exports = {
    addLog: addLog,
    addErrorLog: addErrorLog,
    clearLog: clearLog
}
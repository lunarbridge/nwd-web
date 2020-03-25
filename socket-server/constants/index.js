const PREDICTION_SOFTWARE_NAME = "Segmentation-Predict";

const PREDICTION_SOFTWARE_PARAMETERS = {
    NUM_SLIDE_ACTOR: 1,
    THRESHOLD: 0.5,
    BATCH_SIZE: 4
}

const JOB_STATUS = {
    0: "NOT_LAUNCH",
    1: "IN_QUEUE",
    2: "RUNNING",
    3: "SUCCESS",
    4: "FAILED",
    5: "IN_DETERMINATE",
    6: "WAIT",
    7: "PREVIEWED",
    8: "KILLED"
}

const DELAY_CHECK_ONLINE = 5000;

// export const JobStatus = Object.freeze({
//     NOTLAUNCH: 0,
//     INQUEUE: 1,
//     RUNNING: 2,
//     SUCCESS: 3,
//     FAILED: 4,
//     INDETERMINATE: 5,
//     WAIT: 6,
//     PREVIEWED: 7,
//     KILLED: 8
//   });

module.exports = {
    PREDICTION_SOFTWARE_NAME,
    PREDICTION_SOFTWARE_PARAMETERS,
    JOB_STATUS,
    DELAY_CHECK_ONLINE
}
const model = require('../model');
const constants = require("../constants");

const fetchSoftware = async() => {
  let latestSoftware = await model.latestPredictionSoftware();
  latestSoftware = latestSoftware.rows[0];
  const parameters = await model.softwareParameters(latestSoftware.id);

  let params = [];

  parameters.rows.forEach(param => {
    let value = constants.PREDICTION_SOFTWARE_PARAMETERS[param.value_key];
    value = value ? value : param.default_value;
    const requireSetValue = value ? false : true;

    params.push({
      id: param.id, 
      key: param.value_key,
      value: value,
      requireSetValue: requireSetValue
    });
  });

  return ({
    latestSoftware: latestSoftware,
    parameters: params
  });
}

const fetchProcessStatus = async(projectId) => {
  const status = await model.processStatus({ projectId: projectId });

  return ({
    processStatus: status.rows
  });
}

module.exports = {
  fetchProcessStatus,
  fetchSoftware
}


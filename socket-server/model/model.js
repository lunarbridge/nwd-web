const Pool = require("pg").Pool;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  hots: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE
});

const imageInformation = async({ imageInstanceIds }) => {
  // TODO: add preview URL
  const query = `
  SELECT
      i.id,
      i.instance_filename,
      i.thumb,
      i.count_image_job_annotations,
      a.width,
      a.height,
      a.magnification,
      a.resolution
  FROM 
      abstract_image a, 
      image_instance i
  WHERE
      i.id = ANY($1::int[]) AND
      i.base_image_id = a.id;
  `;

  const params = [imageInstanceIds];

  return pool.query(query, params);
}

// const monitorProcess = async(processIds) => {
//     const query = `
//     SELECT
//         id::int,
//         progress::int,
//         status,
//         status_comment
//     FROM
//         job
//     WHERE
//         id = ANY($1::int[]);
//     `;

//     const params = [processIds];

//     return pool.query(query, params);
// }

const processStatus = async({ projectId }) => {
  const query = `
  SELECT 
      j.id::int,
      j_p.value::int AS image_instance_id,
      s.software_version,
      j.status, 
      j.status_comment,
      j.progress::int,
      j.created,
      j.updated,
      s_u.id::int AS job_user_id
  FROM 
      job j, 
      job_parameter j_p, 
      software s,
      software_parameter s_p,
      sec_user s_u
  WHERE
      s.name = $1 AND
      s_p.software_id = s.id AND
      s_p.value_key = 'CYTOMINE_ID_IMAGE' AND
      j_p.software_parameter_id = s_p.id AND
      j_p.job_id = j.id AND
      j.data_deleted = 'f' AND
      j.project_id = $2 AND
      s_u.job_id = j.id
  ORDER BY 
      j.id DESC;
  `;
  // const query = `
  // SELECT 
  //     j.id::int,
  //     j_p.value::int AS image_instance_id,
  //     s.software_version,
  //     j.status, 
  //     j.status_comment,
  //     j.progress::int,
  //     j.created,
  //     j.updated,
  //     s_u.id::int AS user_id,
  //     s_u.username
  // FROM 
  //     job j, 
  //     job_parameter j_p, 
  //     software s,
  //     software_parameter s_p,
  //     sec_user s_u
  // WHERE
  //     s.name = $1 AND
  //     s_p.software_id = s.id AND
  //     s_p.value_key = 'CYTOMINE_ID_IMAGE' AND
  //     j_p.software_parameter_id = s_p.id AND
  //     j_p.job_id = j.id AND
  //     j.data_deleted = 'f' AND
  //     j.project_id = $2 AND
  //     s_u.id = (
  //         SELECT
  //             s_u.user_id
  //         FROM
  //             sec_user s_u
  //         WHERE
  //             s_u.job_id = j.id
  //     )
  // ORDER BY 
  //     j.id DESC;
  // `;

  const params = [constants.PREDICTION_SOFTWARE_NAME, projectId];
  
  return pool.query(query, params);
}

const latestPredictionSoftware = async() => {
  const query = `
  SELECT
      id::int,
      software_version
  FROM
      software
  WHERE
      name = $1;
  `

  const params = [constants.PREDICTION_SOFTWARE_NAME];

  return pool.query(query, params);
}

const softwareParameters = async(softwareId) => {
  const query = `
  SELECT
      id::int,
      value_key,
      default_value
  FROM 
      software_parameter
  WHERE 
      software_id = $1::int AND
      set_by_server = 'f'
  `

  const params = [softwareId];

  return pool.query(query, params);
}

module.exports = {
  imageInformation,
  processStatus,
  latestPredictionSoftware,
  softwareParameters,
  // monitorProcess
}


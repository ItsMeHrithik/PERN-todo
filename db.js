const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ucayscuisetczf",
  password: "88ca7a5c2fc58bf521b995772875d9f8a3d00b335e4a4a32d146c2e13bd298e4",
  host: `ec2-52-72-190-41.compute-1.amazonaws.com`,
  port: 5432,
  database: "dcqosjf26g2gvm",
});

module.exports = pool;

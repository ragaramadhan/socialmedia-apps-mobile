import Redis from "ioredis";
// tambahan sedikit
// ? default: localhost:6379
// ? Bila ingin tembak ke connection remote
// ? Gunakan Object
/** 
  {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    username: "default", // needs Redis >= 6
    password: "my-top-secret",
    db: 0, // Defaults to 0
  }
 */
const redis = new Redis({
  port: 12630, // Redis port
  host: "redis-12630.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "5v4rm3JSo41oBeMyV6OcAUmDTV3TkeXr",
  db: 0, // Defaults to 0
});

export default redis;

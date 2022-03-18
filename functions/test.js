const { handler } = require("./apis/getEnvironmentList");

handler({'ok': 'ok'}).then((res) => console.log('res', res)).catch((err) => console.log('err in handler', err));
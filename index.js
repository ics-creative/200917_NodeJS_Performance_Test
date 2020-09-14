const {execSync} = require('child_process');
const os = require('os');

const STEP = 5;

const start = async () => {
  const platform = {
    cpu: os.cpus()[0].model,
    coreNum: os.cpus().length,
    totalMemory: os.totalmem(),
    nodeVersion: process.version,
    os: os.platform() + ', ' + os.release(),
  };

  const result = {
    typescript: [],
    scss: [],
    nuxtGenerate: [],
    lint: [],
  };

  const testList = [
    {target: 'typescript', commands: 'cd example-ts && yarn run build'},
    {target: 'scss', commands: 'cd example-scss && yarn run build'},
    {target: 'nuxtGenerate', commands: 'cd example-nuxt && yarn run generate'},
    {target: 'lint', commands: 'cd example-nuxt && yarn run lint'},
  ];

  for (let i = 0; i < STEP; i++) {
    console.log(`start performance...[${i + 1}/${STEP}]`);


    for (let j = 0; j < testList.length; j++) {
      const item = testList[j];
      console.log(`[${j + 1}/${testList.length}] ${item.target}...`);
      const time = Date.now();
      execSync(item.commands);
      const ms = Date.now() - time;
      result[item.target].push(ms);
      await sleep(500);
    }

    await sleep(500);
  }

  console.log({
    platform,
    result,
  });
};

const sleep = (ms) => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, ms);
});

start();

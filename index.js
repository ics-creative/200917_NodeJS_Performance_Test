const {execSync} = require('child_process');
const os = require('os');
const fs = require('fs');

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

  const caches = [
    'example-ts/node_modules/.cache',
    'example-scss/node_modules/.cache',
    'example-nuxt/node_modules/.cache',
  ];


  for (let i = 0; i < STEP; i++) {
    console.log(`start performance...[${i + 1}/${STEP}]`);

    // キャッシュファイルの削除
    caches.forEach(folder => {
      if (fs.existsSync(folder)) {
        console.log(`delete ${folder}`);
        fs.rmdirSync(folder, {recursive: true});
      }
    });

    for (let j = 0; j < testList.length; j++) {
      const item = testList[j];
      console.log(`[${j + 1}/${testList.length}] ${item.target}...`);
      const time = Date.now();
      execSync(item.commands);
      const ms = Date.now() - time;
      console.log(`${ms} ms`);

      // yarn install後の1回目の試行は外れ値になることが多いので除外
      if (i > 0) {
        result[item.target].push(ms);
      }

      await sleep(500); // CPUの呼吸
    }

    await sleep(500); // CPUの呼吸
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

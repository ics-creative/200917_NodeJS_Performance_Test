const {execSync} = require('child_process');
const os = require('os');

console.log('start performance...');

const platform = {
  cpu: os.cpus()[0].model,
  coreNum: os.cpus().length,
  totalMemory: os.totalmem(),
  nodeVersion: process.version,
  os: os.platform() + ', ' + os.release(),
};


const result = {
  typescript: null,
  scss: null,
  nuxtGenerate: null,
  lint: null,
};

const testList = [
  {target: 'typescript', commands: 'cd example-ts && yarn run build'},
  {target: 'scss', commands: 'cd example-scss && yarn run build'},
  {target: 'nuxtGenerate', commands: 'cd example-nuxt && yarn run generate'},
  {target: 'lint', commands: 'cd example-nuxt && yarn run lint'},
];

testList.forEach((item, index) => {
  console.log(`[${index}/${testList.length}] ${item.target}...`);
  const time = Date.now();
  execSync(item.commands);
  result[item.target] = Date.now() - time;
});


console.log({
  platform,
  result,
});

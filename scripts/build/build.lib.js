const { exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs-extra');
/**
 * Execute build shell command from the root
 * @param {String} component required
 */

if (process.argv.length === 2) {
  console.error(
    chalk.bgRed('Expected argument! you should pass a name of component'),
  );
  process.exit(1);
}

const toPascalCase = (name) => {
  const clearAndUpper = (text) => {
    return text.replace(/-/, '').toUpperCase();
  };
  return name.replace(/(^\w|-\w)/g, clearAndUpper);
};

const filesToCopy = ['package.json', 'README.md'];

const component = process.argv[2];
const componentName = toPascalCase(component);
const buildPath = `packages/${component}`;
const buildOutput = `${buildPath}/build/`;

const getBuildTypes = () => {
  let buildTypes = ['client', 'ssr'];
  if (process.argv.includes('--add-umd')) {
    buildTypes.push('umd');
  }
  return buildTypes;
};

console.info(chalk.yellow('Build in progress ===>'));

const taskBuild = async () => {
  await new Promise((resolve, reject) => {
    const buildTypes = getBuildTypes();
    exec(`rm -rf -v ${buildOutput}`, () => {
      console.info(chalk.green(` X  -- ${buildOutput} cleaned`));

      buildTypes.forEach((type, i) => {
        let process;
        console.info(chalk.yellow(` X  -- Build '${buildTypes[i]}'`));
        if (type === 'umd') {
          process = exec(
            `webpack ${buildPath}/index.ts -o ${buildOutput}/dist/${componentName}.${type}.common.js --config config/build/webpack.config.${type}.js --output-library ${componentName}Lib  --color=always`,
          );
          manageProcessBuild(process, buildTypes, i);
        }

        if (type !== 'umd') {
          process = exec(
            `webpack ${buildPath}/index.ts -o ${buildOutput}/dist/${componentName}.${type}.common.js  --config config/build/webpack.config.${type}.js  --color=always`,
          );
          manageProcessBuild(process, buildTypes, i);
        }
      });
    });
  });
};

const manageProcessBuild = (process, buildTypes, i) => {
  process.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  process.stderr.on('data', (data) => {
    console.error('error: ' + data.toString());
  });

  process.on('exit', () => {
    if (i === buildTypes.length - 1) {
      taskCopying();
    }
  });
};

const copyFile = (src, dest) => {
  console.log(chalk.bgGrey('Copying started...\n'));
  exec(`cp ${src} ${dest}`, (error) => {
    if (error) {
      console.log(chalk.bgRed(`Exec error: ${error}`));
    }
  });
};

const taskCopying = async () => {
  await Promise.all(
    filesToCopy.map((f) => {
      if (f === 'package.json') {
        const data = JSON.parse(fs.readFileSync(`${buildPath}/${f}`));
        data.main = `dist/${componentName}.ssr.common.js`;
        data.browser = `dist/${componentName}.client.common.js`;
        if (getBuildTypes().includes('umd')) {
          data.umd = `dist/${componentName}.umd.common.js`;
        }
        fs.writeFileSync(
          `${buildOutput}package.json`,
          JSON.stringify(data, null, 2),
        );
      } else {
        copyFile(`${buildPath}/${f}`, buildOutput);
      }
    }),
  );
};

taskBuild();

const childProcess = require('child_process');
const exec = childProcess.exec;

const data = require('./parcel.json').package;

function buildCommand() {
  let command = `rm -rf .cache && rm -rf public/test && nodemon bin/www `;

  data.forEach((i) => {
    if (i.vendor) {
      const order =
        `& NODE_ENV=development parcel watch ${i.js}.js -d public/test/${i.outName} --no-cache &

        NODE_ENV=development parcel watch ${i.vendor}.js -d public/test/${i.outName} --no-cache &

        lessc -x ${i.style}.less > ${i.style}.css -clean-css="advanced" `;

      command += order;
    } else {
      const order =
        `& NODE_ENV=development parcel watch ${i.js}.js -d public/test/${i.outName} --no-cache &

        lessc -x ${i.style}.less > ${i.style}.css -clean-css="advanced" `;

      command += order;
    }
  });

  console.log(command);

  return command;

}

exec(buildCommand()).stdout.on('data', (data) => {
  console.log(data);
});

const fs = require('node:fs');
const path = require('node:path');

const filesDirectory = path.join(__dirname, 'files');
fs.mkdirSync(filesDirectory, { recursive: true });

const [command, requestedName, ...contentParts] = process.argv.slice(2);
const content = contentParts.join(' ');

function getFilePath(fileName) {
  if (!fileName || path.basename(fileName) !== fileName || fileName === '.' || fileName === '..') {
    throw new Error('Provide a file name without folder paths.');
  }

  return path.join(filesDirectory, fileName);
}

function showUsage() {
  console.log('Usage: node index.js <create|read|update|delete|list> [fileName] [content]');
}

try {
  if (command === 'list') {
    const entries = fs.readdirSync(filesDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile());

    if (entries.length === 0) {
      console.log('The files folder is empty.');
    }

    for (const entry of entries) {
      const filePath = path.join(filesDirectory, entry.name);
      console.log(`Path: ${filePath}`);
      console.log(`Name: ${path.basename(filePath)}`);
      console.log(`Extension: ${path.extname(filePath) || '(none)'}`);
      console.log(`Contents:\n${fs.readFileSync(filePath, 'utf8')}\n`);
    }
  } else if (['create', 'read', 'update', 'delete'].includes(command)) {
    const filePath = getFilePath(requestedName);

    if (command === 'create') {
      fs.writeFileSync(filePath, content, { flag: 'wx' });
      console.log(`Created ${filePath}`);
    } else if (command === 'read') {
      console.log(fs.readFileSync(filePath, 'utf8'));
    } else if (command === 'update') {
      fs.appendFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    } else {
      fs.unlinkSync(filePath);
      console.log(`Deleted ${filePath}`);
    }
  } else {
    showUsage();
    process.exitCode = 1;
  }
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`Error: file "${requestedName || ''}" does not exist.`);
  } else if (error.code === 'EEXIST') {
    console.error(`Error: file "${requestedName}" already exists.`);
  } else {
    console.error(`Error: ${error.message}`);
  }

  process.exitCode = 1;
}

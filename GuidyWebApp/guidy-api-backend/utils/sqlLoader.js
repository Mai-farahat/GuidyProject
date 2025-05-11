'use strict';
const fs = require('fs');
const path = require('path');

const loadSqlQueries = async (folderName) => {
  const filePath = path.join(__dirname, '..', 'data', folderName);
  const files = await fs.promises.readdir(filePath);
  const sqlFiles = files.filter(f => f.endsWith('.sql'));
  const queries = {};

  for (const sqlFile of sqlFiles) {
    const content = await fs.promises.readFile(path.join(filePath, sqlFile), 'utf8');
    queries[sqlFile.replace('.sql', '')] = content;
  }

  return queries;
};

module.exports = { loadSqlQueries };



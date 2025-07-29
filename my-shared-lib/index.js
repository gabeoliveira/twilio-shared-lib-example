const { v4: uuidv4 } = require('uuid');

function generateCustomGreeting(name) {
  return `Hello ${name}, your session ID is ${uuidv4()}`;
}

module.exports = {
  generateCustomGreeting,
};

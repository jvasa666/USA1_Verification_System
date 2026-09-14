const fs = require('fs');
if (fs.existsSync('server.js')) {
    const code = fs.readFileSync('server.js', 'utf8');
    console.log("SERVER CODE:\n", code);
} else {
    console.log("server.js not found in current directory.");
    console.log("Files available:", fs.readdirSync('.'));
}

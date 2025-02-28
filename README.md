## Description

This project is created in order to solve GreenTube QA assigment.
Environment is not stable so test are flacky - sometimes thay pass and sometimes thay fail.
Example: Create pet order with id = 1 and afterwords get data for pet order id = 1. Result: 404

## Priject set up

To run project localy execute next steps:

1. Install node.js
2. Clone Git project to your PC
3. Open it in IDE
4. Open terminal and install dependencies with command : npm ci
5. Next commands are used to run tests:

## Running custom commands:

- 'npm run prettier:write' - to format code
- 'npm run prettier:check' - to check if code is formated properly
- 'npx playwright test' - run tests headless

## Best practices

- use prettier to check is your code clean $${\color{red}npm}$$ $${\color{red}run}$$ $${\color{red}prettier:check}$$
- format project with prettier $${\color{red}npm}$$ $${\color{red}run}$$ $${\color{red}prettier:write}$$

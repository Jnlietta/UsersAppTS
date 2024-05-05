const inquirer = require('inquirer');

const startApp = () => {
    enum Action {
        List = "list",
        Add = "add",
        Remove = "remove",
        Quit = "quit"
      }
      
      type InquirerAnswers = {
        action: Action
      }

  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

startApp();
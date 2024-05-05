const inquirer = require('inquirer');
const consola = require('consola');

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

      enum MessageVariant {
        Success = "success",
        Error = "error",
        Info = "info",
      }

    class Message {
        private content: string;

        constructor(content: string){
            this.content = content;
        }

        public show() {
            console.log(this.content);
        }

        public capitalize() {
            this.content =  this.content.charAt(0).toUpperCase() + this.content.slice(1);
        }

        public toUpperCase() {
            this.content = this.content.toUpperCase();
        }

        public toLowerCase() {
            this.content = this.content.toLowerCase();
        }

        static showColorized(variant: MessageVariant, text: string) {
            if (variant === MessageVariant.Success) {
                consola.success(text);
            } else if (variant === MessageVariant.Error) {
                consola.error(text);
            } else if (variant === MessageVariant.Info) {
                consola.info(text);
            } 
        }
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
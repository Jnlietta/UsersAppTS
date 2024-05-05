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

        static showColorized(variant: MessageVariant, text: string): void {
            if (variant === MessageVariant.Success) {
                consola.success(text);
            } else if (variant === MessageVariant.Error) {
                consola.error(text);
            } else if (variant === MessageVariant.Info) {
                consola.info(text);
            } 
        }
    }

    type User = {
        name: string;
        age: number
    }

    class UsersData {
        private data: User[] = [];

        showAll() {
            Message.showColorized(MessageVariant.Info, "Users data: ");
            if (this.data.length === 0) {
                console.log("No data...");
            } else {
                console.table(this.data);   
            }
        }

        public add(user: User): void {
            if(user.name.length > 0 && user.age > 0){
                this.data.push(user);
                Message.showColorized(MessageVariant.Success, "User has been succesfully added!");
            } else {
                Message.showColorized(MessageVariant.Error, "Wrong data!");
            }
        }

        remove(name: string) {
            const index = this.data.findIndex(user => user.name === name);
            if(index !== -1){
                this.data.splice(index, 1);
                Message.showColorized(MessageVariant.Success, "User deleted!");
            } else {
                Message.showColorized(MessageVariant.Error, "User not found...");
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
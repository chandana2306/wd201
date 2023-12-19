"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdue = await Todo.overdue();
      console.log(overdue.map((items) => items.displayableString()).join("\n"));
      console.log("\n");

      console.log("Due Today");
      const dueToday = await Todo.dueToday();
      console.log(
        dueToday.map((items) => items.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Later");
      const dueLater = await Todo.dueLater();
      console.log(
        dueLater.map((items) => items.displayableString()).join("\n"),
      );
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
      });
    }

    static async markAsComplete(id) {
      let todo = await Todo.findByPk(id);
      todo.completed = true;
      return await todo.save();
    }

    displayableString() {
      const today = new Date().toLocaleDateString();
      const dueDate = new Date(this.dueDate).toLocaleDateString();
      const checkbox = this.completed ? "[x]" : "[ ]";

      if (dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }

      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};

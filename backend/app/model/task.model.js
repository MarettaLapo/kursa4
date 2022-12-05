module.exports = (sequelize, Sequelize) => {
    var Task = sequelize.define(
        'task', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            is_done: {
                type: Sequelize.BOOLEAN, // тип данных BOOLEAN (в MySQL — TINYINT)
                allowNull: false,
                defaultValue: false
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            project_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы user_category с другими таблицами
    Task.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        Task.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        // Определение связи один-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        Task.belongsTo(models.project, {
            foreignKey: 'project_id'
        });
    };
    return Task;
};
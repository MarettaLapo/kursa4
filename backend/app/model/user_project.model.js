module.exports = (sequelize, Sequelize) => {
    var UserProject = sequelize.define(
        'user_project', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            is_admin: {
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
    UserProject.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        UserProject.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        // Определение связи один-ко-многим с таблицей category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы category): в файле category.model.js
        UserProject.belongsTo(models.project, {
            foreignKey: 'project_id'
        });
    };
    return UserProject;
};
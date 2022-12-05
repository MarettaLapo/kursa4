module.exports = (sequelize, Sequelize) => {
    var Project = sequelize.define(
        'project', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true, 
                primaryKey: true, 
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы category с другими таблицами
    Project.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Project.hasMany(models.user_project, {
            foreignKey: 'project_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
        Project.hasMany(models.task, {
            foreignKey: 'project_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Project;
};
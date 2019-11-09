
exports.up = function(knex) {
  return knex.schema.createTable('users', user => {
      user.increments();
      user.string('username', 155)
          .notNullable()
          .unique();
      user.string('password', 155)
          .notNullable();
      user.string('description');
      user.string('image');
  })

  .createTable('series', series => {
      series.increments();
      series.string('name')
            .notNullable()
            .unique();
  })

  .createTable('type', type => {
      type.increments();
      type.string('name', 155)
          .notNullable();
  })

  .createTable('items', item => {
      item.increments();
      item.string('name')
          .notNullable();
      item.string('image');
      item.integer('issue_num')
          .notNullable()
          .unique();
      item.integer('userId').references('id').inTable('users');
      item.string('series_name').references('name').inTable('series');
      item.string('type').references('name').inTable('type');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items')
                    .dropTableIfExists('type')
                    .dropTableIfExists('series')
                    .dropTableIfExists('users')
};

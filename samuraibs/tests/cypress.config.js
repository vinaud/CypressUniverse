const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const pool = new Pool({
        host: 'fanny.db.elephantsql.com',
        user: 'wllbnhxt',
        password: 'VgeqRBHzmEAd2FM-k-KPJwGfofjz17bN',
        database: 'wllbnhxt',
        port: 5432
      });

      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
              if (error) {
                throw error
              }
              resolve({ success: result });
            });
          })
        },
        findToken(email) {
          return new Promise(function (resolve) {
            pool.query(`select B.token from
                       public.users A
                       INNER JOIN public.user_tokens B
                       ON A.id = B.user_id
                       WHERE A.email = $1
                       ORDER BY B.created_at`, [email], function (error, result) {
              if (error) {
                throw error
              }
              resolve({ token: result.rows[0].token });
            });
          })
        } 
    })},
  baseUrl: 'https://samuraibs-web-vinaud.herokuapp.com',
  apiServer: 'https://samuraibs-api-vinaud.herokuapp.com',
  viewportWidth: 1440,
  viewportHeight: 900
},
});

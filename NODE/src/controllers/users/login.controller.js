const bcrypt = require("bcrypt")
const database = require("../../Modules/config")
const sql = require("../../Modules/sqlHandler");
const sqlQuery = sql.query;

module.exports = (dependencies) => {
    return async (req, res, next) => {
        const userPassword = req.body.userPassword;
        const userEmail = req.body.userEmail;
        var status;
        let dataStore = {};
        try {
            if (!userPassword || !userEmail) {
                throw new Error("Please enter valid email and password");
            } else {
                async function CheckPassword(hash, userPassword) {
                    const password = userPassword
                    const hashedPassword = await new Promise((resolve, reject) => {
                        bcrypt.compare(password, hash, function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    })
                    return hashedPassword
                }

                async function getData() {
                    return new Promise((resolve, reject) => {
                      sqlQuery(`SELECT * FROM db_users WHERE userEmail = '${userEmail}'`)
                        .then((result) => {
                            console.log(result);
                          if (result.length < 1) {
                            reject("Invalid Email");
                          } else {
                            CheckPassword(result[0].userPassword, userPassword)
                              .then((checkPw) => {
                                if (checkPw) {
                                  dataStore.UserData = result[0];
                                  resolve(result);
                                } else {
                                  reject("Invalid Password");
                                }
                              })
                              .catch(reject);
                          }
                        })
                        .catch(reject);
                    });
                }                                    

                await getData();
                res.send({ "status": true, "msg": 'success', data: dataStore });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, msg: error.toString() });
        }
    }
}


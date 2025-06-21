const db = require('../model/database');

exports.getDash = async (req, res, next) => {
  try {
    const pieData = await db.manyOrNone(
      "SELECT finalidade, count(brinco_num) FROM ovino GROUP BY finalidade"
    );
    res.status(201).json(pieData);
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    throw err;
  }
}
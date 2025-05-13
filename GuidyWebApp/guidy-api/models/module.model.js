const { connectToDB, sql } = require('../config/db.config');

const ModuleModel = {
  async create({ courseId, title, durationHours, moduleOrder }) {
    const pool = await connectToDB();
    await pool.request()
      .input('CourseID', sql.Int, courseId)
      .input('Title', sql.NVarChar(100), title)
      .input('Duration_Hours', sql.Decimal(10, 2), durationHours)
      .input('ModuleOrder', sql.Int, moduleOrder)
      .query(`
        INSERT INTO Module (CourseID, Title, Duration_Hours, ModuleOrder)
        VALUES (@CourseID, @Title, @Duration_Hours, @ModuleOrder)
      `);
  },

  async getAll() {
    const pool = await connectToDB();
    const result = await pool.request().query(`
      SELECT * FROM Module ORDER BY ModuleOrder
    `);
    return result.recordset;
  },

  async getById(moduleId) {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('ModuleID', sql.Int, moduleId)
      .query(`SELECT * FROM Module WHERE ModuleID = @ModuleID`);
    return result.recordset[0];
  },

  async update(moduleId, { title, durationHours, moduleOrder, status }) {
    const pool = await connectToDB();
    await pool.request()
      .input('ModuleID', sql.Int, moduleId)
      .input('Title', sql.NVarChar(100), title)
      .input('Duration_Hours', sql.Decimal(10, 2), durationHours)
      .input('ModuleOrder', sql.Int, moduleOrder)
      .input('Status', sql.Bit, status)
      .query(`
        UPDATE Module
        SET Title = @Title,
            Duration_Hours = @Duration_Hours,
            ModuleOrder = @ModuleOrder,
            Status = @Status
        WHERE ModuleID = @ModuleID
      `);
  },

  async delete(moduleId) {
    const pool = await connectToDB();
    await pool.request()
      .input('ModuleID', sql.Int, moduleId)
      .query(`DELETE FROM Module WHERE ModuleID = @ModuleID`);
  }
};

module.exports = ModuleModel;

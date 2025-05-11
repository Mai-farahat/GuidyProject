const { sql, connectToDB } = require('../config/db.config');

async function getAllInstructors() {
  const pool = await connectToDB();
  const result = await pool.request().query('SELECT * FROM Instructor');
  return result.recordset;
}

async function getInstructorById(id) {
  const pool = await connectToDB();
  const result = await pool.request()
    .input('InstructorID', sql.Int, id)
    .query('SELECT * FROM Instructor WHERE InstructorID = @InstructorID');
  return result.recordset[0];
}

async function createInstructor(data) {
  const { InstructorName, InstructorEmail, linkedInLink, phoneNumber, Description } = data;
  const pool = await connectToDB();
  await pool.request()
    .input('InstructorName', sql.NVarChar(50), InstructorName)
    .input('InstructorEmail', sql.VarChar(50), InstructorEmail)
    .input('linkedInLink', sql.VarChar, linkedInLink)
    .input('phoneNumber', sql.VarChar(11), phoneNumber)
    .input('Description', sql.NVarChar(sql.MAX), Description)
    .query(`
      INSERT INTO Instructor (InstructorName, InstructorEmail, linkedInLink, phoneNumber, Description)
      VALUES (@InstructorName, @InstructorEmail, @linkedInLink, @phoneNumber, @Description)
    `);
}

async function updateInstructor(id, data) {
  const { InstructorName, linkedInLink, phoneNumber, Description } = data;
  const pool = await connectToDB();
  await pool.request()
    .input('InstructorID', sql.Int, id)
    .input('InstructorName', sql.NVarChar(50), InstructorName)
    .input('linkedInLink', sql.VarChar, linkedInLink)
    .input('phoneNumber', sql.VarChar(11), phoneNumber)
    .input('Description', sql.NVarChar(sql.MAX), Description)
    .query(`
      UPDATE Instructor
      SET InstructorName = @InstructorName,
          linkedInLink = @linkedInLink,
          phoneNumber = @phoneNumber,
          Description = @Description
      WHERE InstructorID = @InstructorID
    `);
}

async function deleteInstructor(id) {
  const pool = await connectToDB();
  await pool.request()
    .input('InstructorID', sql.Int, id)
    .query('DELETE FROM Instructor WHERE InstructorID = @InstructorID');
}

module.exports = {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
};

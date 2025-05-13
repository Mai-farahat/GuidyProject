
const parseId = (req, res, next) => {
    const id = parseInt(req.params.id);
  
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    req.parsedId = id;
    next();
  };
  
  module.exports = parseId;
  
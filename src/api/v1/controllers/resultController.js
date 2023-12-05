exports.getResults = async (req, res) => {
    try {
      const result = await Results.find();
      res.send({ status: "Success", result: result });
    } catch (error) {
      res.send({ status: error });
    }
  };
  
  exports.storeResults = async (req, res) => {
      try {
          const { username, result, attempts, points, achieved } = req.body;
          if (!username || !result) {
              throw new Error('Username and result data must be provided.');
          }
  
          const newResult = new Results({ username, result, attempts, points, achieved });
          await newResult.save();
  
          res.send({ status: "Result Saved Successfully." });
      } catch (error) {
          res.status(500).send({ status: "Error", message: error.message });
      }
  };
  
  exports.deleteResults = async (req, res) => {
      try {
          await Results.deleteMany()
          res.send({status:"Results Deleted SuccessFully"})
          
      } catch (error) {
    res.send({status:error});
          
      }
  };
  
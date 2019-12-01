export const getOne = model => async (req, res) => {
  const doc = await model
    .findOne({ createdBy: req.user._id, _id: req.params.id })
    .lean()
    .exec();

  if (!doc) {
    res.status(404);
    return res.json({ error: { message: `Data not found` } });
  }

  res.status(200).json({ data: doc });
};

export const getMany = model => async (req, res) => {
  const docs = await model
    .find({ createdBy: req.user._id })
    .lean()
    .exec();

  if (!docs) {
    res.status(404);
    return res.json({ error: { message: `Data not found` } });
  }

  res.status(200).json({ data: docs });
};

export const createOne = model => async (req, res) => {
  const createdBy = req.user._id;
  const doc = await model.create({ ...req.body, createdBy });
  res.status(201).json({ data: doc });
};

export const updateOne = model => async (req, res) => {
  const updatedDoc = await model
    .findOneAndUpdate(
      {
        createdBy: req.user._id,
        _id: req.params.id
      },
      req.body,
      { new: true }
    )
    .lean()
    .exec();

  if (!updatedDoc) {
    res.status(404);
    return res.json({ error: { message: `Data not found` } });
  }

  res.status(200).json({ data: updatedDoc });
};

export const removeOne = model => async (req, res) => {
  const removed = await model.findOneAndRemove({
    createdBy: req.user._id,
    _id: req.params.id
  });

  if (!removed) {
    res.status(404);
    return res.json({ error: { message: `Data not found` } });
  }

  return res.status(200).json({ data: removed });
};

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});

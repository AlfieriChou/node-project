const findZdy = async (Schema,condition) => {

	const data = await Schema.find(condition);
	return data

}

const findOneZdy = async (Schema,condition) => {

	const data = await Schema.findOne(condition);
	return data

}

const findOneAndUpdateZdy = async (Schema, condition, doc) => {

	const data = await Schema.findOneAndUpdate(condition, doc);
	return data

}

const findByIdZdy = async (Schema,_id) => {

	const data = await Schema.findById(req.params._id);
	return data

}

const findByIdAndUpdateZdy = async (Schema, _id, doc) => {

	const data = await Schema.findOneAndUpdate(_id, doc);
	return data

}

const updateOneZdy = async (Schema, condition, doc) => {

	const data = await Schema.updateOne(condition, doc);
	return data

}

const updateManyZdy = async (Schema, condition, doc) => {

	const data = await Schema.updateManyZdy(condition, doc);
	return data

}


export {
	findZdy,
	findOneZdy,
	findOneAndUpdateZdy,
	findByIdZdy,
	findByIdAndUpdateZdy,
	updateOneZdy,
	updateManyZdy
}

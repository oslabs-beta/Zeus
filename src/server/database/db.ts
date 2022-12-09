//acquiring mongoose framework
const mongoose = require('mongoose');

export interface UserData { 
	email: string;
	username: string;
	password: string;
}

//this line below is used to suppress deprecation warnings
mongoose.set('strictQuery', true);

const mongoURI =
	'mongodb+srv://zeus:zeus@cluster0.1i7iws7.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
  mongoURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoReconnect: true,
		dbName: 'zeus',
	},
	() => console.log('🦆🦆🦆🦆🦆🦆🦆🦆  Mongoose is connected')
);

//user schema
const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
});

//Collection name is Users
const Users = mongoose.model('Users', userSchema); //const User =
// Export db
module.exports = Users;

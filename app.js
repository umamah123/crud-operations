var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var mongoose = require('mongoose');
const bankDetails = require('./bankdetails');
mongoose.connect("mongodb://localhost:27017/bankdetailsdata", (err) => {
	if (!err) {
		console.log("server connected to mongodb");
	}
})

app.get('/', (req, res) => {
	bankDetails.find({}, (err, bankdetails) => {
		if (err) {
			res.json({ success: false, message: err })
		} else {
			res.json({ success: true, bankdetails: bankdetails })
		}

	})
});

app.post('/bankdetails', (req, res) => {
	let note = new bankDetails(req.body);
	note.save(function (err, note) {
		if (err) {

			res.status(400).json(err);
		}
		res.status(200).json(note);
	})

});

app.put('/update/:id', function (req, res) {

	if (!req.params.id) {
		res.json({ success: false, message: 'no customer id provided' });
	} else {
		bankDetails.findOne({ id: req.params.id }, (err, bankdetails) => {
			if (err) {
				res.json({ success: false, message: 'not a valid customer id' })
			} else {
				bankdetails.cust_id = req.body.cust_id;
				bankdetails.name = req.body.name;
				bankdetails.ifsc = req.body.ifsc;
				bankdetails.accnmbr = req.body.accnmbr;
				bankdetails.ph = req.body.ph;

				bankdetails.save((err) => {
					if (err) {
						res.json({ success: false, message: err });
					} else {
						res.json({ success: true, message: 'Bank details Updated!' });
					}
				})
			}
		})
	}
})
app.delete('/delete/:id', function (req, res) {
	if (!req.params.id) {
		res.json({ success: false, message: 'no customer id provided' });
	} else {
		bankDetails.findOne({ id: req.params.id }, (err, bankdetails) => {
			if (err) {
				res.json({ success: false, message: 'not a valid customer id' })
			} else {
				bankdetails.remove((err) => {
					if (err) {
						res.json({ success: false, message: err })
					} else {
						res.json({ success: true, message: 'Bank Details  deleted' })
					}
				});
			}
		});
	}
})
const port = 8000;
app.listen(port, function () {
	console.log("hi success server running on port " + port);
})
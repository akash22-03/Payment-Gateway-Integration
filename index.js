const express = require('express')
const Razorpay = require('razorpay')

let app = express()

const razorpay = new Razorpay({
  key_id: 'rzp_test_6rd0Ls2ivRjKUP',
  key_secret: 'pR3izsg28pMSsy9ELkIVCLX0',
})

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('razorpay.ejs')
})

app.post('/order', (req, res) => {
  var options = {
    amount: 50000,
    currency: "INR",
  };
  razorpay.orders.create(options, function (error, order) {
    console.log(order)
    res.json(order)
  })
})

app.post('/is-order-complete', (req, res) => {
  razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == 'captured') {
      res.render('Success.ejs')
    } else {
      res.redirect('/')
    }
  })
})

app.listen(5001)
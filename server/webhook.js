
require('dotenv').config();
const stripe = require("stripe")('sk_test_51OcPi9CUIwAO4HE3pAZh22Sif5QQTnvkyr2zXpRws3553cTKKxNHFSCvhx2nHCLNgZZFUmK54SZh7S2VnFqivHk700Wv7tYVeJ');
// process.env.STRIPE_KEY);
const endpointSecret = 'whsec_c3d3fe40cc8900932d74fe7a3e532b8481b907de06493124768a829214a0e84c';
//  process.env.ENDPOINT_SECRET;
const { OrderModel } = require('./order/order.model');


const handleWebhook = async (request, response) => {
    console.log('webhook triggers!')
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.error(err.stack);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            break;
        case 'checkout.session.completed':
            try {
                const session = event.data.object;
                console.log('Checkout session:', session);
                const checkoutSession = event.data.object;
                const amountTotal = checkoutSession.amount_total / 100;
                // const currency = checkoutSession.currency;
                const customerId = checkoutSession.customer;
                const customer = checkoutSession.customer_details.email;
                const paymentStatus = checkoutSession.payment_status;
                const eventCreatedAt = event.created;
                const paymentCompletedDate = new Date(eventCreatedAt * 1000);
                // Retrieve the session's line items
                const fullSession = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
                    expand: ['line_items'],
                },);
                const lineItems = fullSession.line_items.data;
                const orderedItems = lineItems.map(item => {
                    return {
                        price: item.price.unit_amount / 100,
                        plan: item.price.product.name,
                        title: item.description,
                    };
                });
                const fullCustomer = await stripe.customers.retrieve(customerId);
                const customerName = fullCustomer.name;
                const newOrder = {
                    customerName: customerName,
                    customerEmail: customer,
                    stripeCustomerId: customerId,
                    orderItems: orderedItems,
                    totalprice: amountTotal,
                    paymentStatus: paymentStatus,
                    date: paymentCompletedDate, // Use server's date or from req.body
                    delivered: false
                };
                // Save order details
                try {
                    await OrderModel.create(newOrder);
                    // Further actions like sending confirmation emails
                } catch (error) {
                    console.error("Error saving order:", error);
                    // Handle error appropriately
                }


            } catch (error) {
                console.error("Error processing checkout.session.completed event:", error);
            }
            break;

        case 'charge.succeeded':
            const chargeSucceded = event.data.object;
            // console.log("chargeSucceded", chargeSucceded);
            break;
        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            // console.log("paymentIntentCreated", paymentIntentCreated);
            break;
        // ... handle other event types
        default:

    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
};

module.exports = { handleWebhook };
import { NextResponse } from "next/server";
import Stripe from "stripe"

export async function POST(request) {

    // if (request.method !== 'POST') { return res.sendStatus(405) }
    const body = await request.json()

    if (body.lineItems.length === 0) {

        return new Response('Error', {
            status: 405,
        });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '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', {
            apiVersion: '2020-08-27'
        })

        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: body.lineItems,
            shipping_address_collection: {
            allowed_countries: ['FR'],},
            mode: 'payment'
        })
        return NextResponse.json({ session })
    } catch (err) {
        console.log('BROKED')
        console.log(err)
        return new Response('Error', {
            status: 405,
        });
    }
}
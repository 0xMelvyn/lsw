import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    const body = await request.json();

    if (body.lineItems.length === 0) {
        return new Response('Error', {
            status: 405,
        });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
            apiVersion: '2024-04-10'
        });

        // Ajout d'un article pour les frais de livraison
        const lineItemsWithShipping = [...body.lineItems];
        lineItemsWithShipping.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Frais de livraison',
                },
                unit_amount: 499, // Montant en centimes (5 €)
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: 'https://lsw.vercel.app/success',
            cancel_url: 'https://lsw.vercel.app/',
            line_items: lineItemsWithShipping,
            shipping_address_collection: {
                allowed_countries: ['FR'],
            },
            mode: 'payment',
            allow_promotion_codes: true
        });

        return NextResponse.json({ session });
    } catch (err) {
        console.log('BROKED');
        console.log(err);
        return new Response('Error', {
            status: 405,
        });
    }
}

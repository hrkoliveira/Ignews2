import Head from 'next/head';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import { useSession } from 'next-auth/client';

interface HomeProps {
    product: {
        priceId: string,
        amount: number
    }
}


export default function Home({ product }: HomeProps) {
    const [session] = useSession();

    return session ? (
        <>
            <Head>
                <title>Início | ig.news</title>
            </Head>
            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Welcome, {session.user.name}</span>
                    <h1>New about the <span>React</span> world</h1>
                    <p>
                        Get access to all the publications <br />
                        <span>for {product.amount} month</span>
                    </p>
                    <SubscribeButton priceId={product.priceId} />
                </section>

                <img src="/images/avatar.svg" alt="Girl Coding" />
            </main>
        </>
    ) : (
        <>
            <Head>
                <title>Início | ig.news</title>
            </Head>
            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Hey, welcome</span>
                    <h1>New about the <span>React</span> world</h1>
                    <p>
                        Get access to all the publications <br />
                        <span>for {product.amount} month</span>
                    </p>
                    <SubscribeButton priceId={product.priceId} />
                </section>

                <img src="/images/avatar.svg" alt="Girl Coding" />
            </main>
        </>
    );
}

//Client-side
//Server-side Rendering
//Static Site Generation

//Conteúdo (SSG)
//Comentários (Client-side)

export const getStaticProps: GetStaticProps = async () => {
    //Com detalhes gerais do produto.

    /* const price = await stripe.prices.retrieve('price_1JbpCjGkMB7FSZBu7ouxaAE2', {
        expand: ['product']
    }); */

    const price = await stripe.prices.retrieve('price_1JbpCjGkMB7FSZBu7ouxaAE2'); //Sem detalhes gerais do produto.

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(price.unit_amount / 100)
    };

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24 //24 Horas
    }
}

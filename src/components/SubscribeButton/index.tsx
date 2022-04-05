import styles from './styles.module.scss';
import { API } from '../../services/api';
import { useRouter } from 'next/router';
import { getStripeJs } from '../../services/stripe-js';
import { signIn, useSession } from 'next-auth/client';

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    const router = useRouter();

    async function handleSubscribe() {
        if (!session) {
            signIn("github");
            return;
        }

        if (session.activeSubscription) {
            router.push('/posts');
            return;
        }

        try {
            const response = await API.post('/subscribe');
            const { sessionId } = response.data;
            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe now
        </button>
    )
}
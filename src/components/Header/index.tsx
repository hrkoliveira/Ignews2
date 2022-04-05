import Link from 'next/link';
import styles from './styles.module.scss';
import { ActiveLink} from '../ActiveLink';
import { SignInButton } from '../SignInButton';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="IgNews" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}

/* Para carregar a página antes, basta colocar um prefecth como propriedade do <Link> */
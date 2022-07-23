import { observer } from 'mobx-react-lite';
import NextLink from 'next/link';

export default observer(Link);

function Link({ href, children, ...props }) {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}

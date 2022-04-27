import { Link } from 'react-router-dom'
import './NotFoundPage.scss'

function NotFoundPage(): JSX.Element {
    return (
        <>
            <section>
                <img
                    // eslint-disable-next-line max-len
                    src="https://www.argildx.com/wp-content/uploads/2017/06/Is-a-Misconfigured-%E2%80%9CPage-Not-Found%E2%80%9D-Jeopardizing-Your-Website.jpg"
                    alt="404 error"
                    className="notfound__img"
                />
            </section>
            <section className="notfound__content">
                <h2>Oooops! Page not found!</h2>
                <p className="notfound__content--text">
                    Sorry, we couldn&apos;t find this page. But don&apos;t
                    worry, you can find plenty of other things on our{' '}
                    <Link to="/">homepage</Link>{' '}
                </p>
            </section>
        </>
    )
}

export default NotFoundPage

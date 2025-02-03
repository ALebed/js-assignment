import {Component, PropsWithChildren} from "react";

interface Props {
    hasError: boolean;
}
interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        if (this.props.hasError || this.state.hasError) {
            return (
                <main className="container">
                    <h1>Page cannot be loaded</h1>
                    <section className="section">
                        <p>You may try to reload the page. If this does not help, please contact application support.</p>
                    </section>
                </main>
            );
        }
        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;
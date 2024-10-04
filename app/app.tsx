import {Provider} from "react-redux";
import {store} from "@/state/store";
import {App} from "expo-router/build/qualified-entry";

const ReactApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default ReactApp;
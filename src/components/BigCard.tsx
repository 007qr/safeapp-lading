import { Accessor, createSignal, lazy, Setter, Show, Suspense } from "solid-js";
import { SignUpModalFlow } from "../utils/types";

const Step1 = lazy(() => import("./Signup/Screens/Step1"));
const Email = lazy(() => import("./Signup/Screens/Email"));
const OTP = lazy(() => import("./Signup/Screens/OTP"));
const Step3 = lazy(() => import("./Signup/Screens/Step3"));
const Joined = lazy(() => import("./Signup/Screens/Joined"));

interface Props {
    title: string;
    setFlow: Setter<SignUpModalFlow>;
    flow: Accessor<string>;
    methodId: Accessor<string>;
    setMethodId: Setter<string>;
}

function Loader() {
    return (
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    );
}

export default function BigCard({
    flow,
    setFlow,
    title,
    methodId,
    setMethodId,
}: Props) {
    const [email, setEmail] = createSignal<string>("");

    return (
        <div class="max-lg:min-w-[362px] max-lg:min-h-[582px] max-lg:w-full max-lg:h-full relative overflow-hidden min-w-[740px] min-h-[473px] w-[740px] h-[632px] rounded-[48px] flex items-center justify-center bg-white">
            <Show when={flow() === "step1"}>
                <Step1 title={title} setFlow={setFlow} />
            </Show>
            <Show when={flow() === "email"}>
                <Suspense fallback={<Loader />}>
                    <Email
                        email={email}
                        setFlow={setFlow}
                        setEmail={setEmail}
                        setMethodId={setMethodId}
                    />
                </Suspense>
            </Show>
            <Show when={flow() == "otp"}>
                <Suspense fallback={<Loader />}>
                    <OTP methodId={methodId} setFlow={setFlow} />
                </Suspense>
            </Show>
            <Show when={flow() == "step3"}>
                <Suspense fallback={<Loader />}>
                    <Step3 setFlow={setFlow} />
                </Suspense>
            </Show>
            <Show when={flow() == "joined"}>
                <Suspense fallback={<Loader />}>
                    <Joined />
                </Suspense>
            </Show>
        </div>
    );
}
